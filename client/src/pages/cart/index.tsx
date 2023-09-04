//? LIBRARY
import './styles/shopping.css';
import './styles/item_cart.css';
import './styles/cart.css';
import IMG from '../../assets/imgs';
import ICON from '../../assets/icons';
import { useState, memo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//? APPS
import { Loading } from '../../components';
import { Cart } from '../../types/cart';
import { AppDispatch } from '../../app/store';
import { formatPrice } from '../../utils/formatPrice';
import { buyCartActions } from '../../redux/buyCart.slice';
import { useAppDispatch } from '../../hooks/hooks';
import { useDeleteCartMutation, useGetCartsQuery, useUpdateCartMutation } from '../../services/cart/index.hook';
import { toast } from 'react-hot-toast';

function CartPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState<any>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [buyCart, setBuyCart] = useState<Cart[]>([]);
  const [deleteCart] = useDeleteCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [data, setData] = useState<[Cart[]]>([[]]);
  const { data: dataCart, isLoading, refetch: fetchCarts } = useGetCartsQuery();

  const [selectedOption, setSelectedOption] = useState<{ itemIndex: number; variationIndex: number } | null>(null);
  const [agrsUpdate, setAgrsUpdate] = useState({
    cartid: 0,
    payload: {
      amount: 0,
      option: '',
    },
  });

  useEffect(() => {
    dataCart?.response && setData(dataCart?.response);
  }, [dataCart]);

  const onCheck = (itemid: number) => {
    setChecked((prev: any) => {
      const isChecked = checked.includes(itemid);
      if (isChecked) {
        return checked.filter((item: any) => item !== itemid);
      } else {
        return [...prev, itemid];
      }
    });
  };

  const onAllCheck = () => {
    setAllChecked(!allChecked);
    if (!allChecked) {
      const itemIds = data?.flatMap((item: any) => item.map((e: Cart) => e.itemid));
      setChecked(itemIds);
    } else {
      setChecked([]);
    }
  };

  const onIncrease = async (item: any) => {
    const payload = {
      amount: +item.amount + 1,
      option: item.option,
    };
    const agrs = { cartid: item.cartid, body: payload };
    await updateCart(agrs).unwrap();
    fetchCarts();
  };

  const onReduced = async (item: any) => {
    const payload = {
      amount: +item.amount - 1,
      option: item.option,
    };
    if (payload.amount === 0) return;
    const agrs = { cartid: item.cartid, body: payload };
    await updateCart(agrs).unwrap();
    fetchCarts();
  };

  const onChangeOption = async (item: any, option: any) => {
    setAgrsUpdate({
      cartid: item.cartid,
      payload: {
        amount: item?.amount,
        option: option,
      },
    });
  };

  const onSubmitChangeOption = async () => {
    const agrs = { cartid: agrsUpdate.cartid, body: agrsUpdate.payload };
    const response = await updateCart(agrs).unwrap();
    if (response.err === 0) {
      toast.success('Cập nhật thành công');
      onHideOption();
    }
    fetchCarts();
  };

  const onDeleteCart = async (cartid: number) => {
    await deleteCart(cartid).unwrap();
    fetchCarts();
  };

  const onBuyCart = () => {
    if (buyCart.length > 0) {
      dispatch(buyCartActions.addBuyCart(buyCart));
      navigate('/order');
    }
  };

  const onShowOption = (indexItem: number, index: number) => {
    setSelectedOption({ itemIndex: indexItem, variationIndex: index });
  };

  const onHideOption = () => {
    setSelectedOption(null);
  };

  useEffect(() => {
    const dataTempt: Cart[] = [];
    data?.forEach((item: any) =>
      item.forEach((element: Cart) => {
        dataTempt.push(element);
      })
    );
    const filteredData = dataTempt.filter((item) => checked.includes(item.itemid));
    if (checked.length === dataTempt.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
    setTotal(filteredData.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0));
    setBuyCart(filteredData);
  }, [checked, data]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {dataCart?.total_cart === 0 ? (
            <div className="emptyCart-img">
              <img src={IMG.EMPTY_CART} alt="emptyCart" />
            </div>
          ) : (
            <>
              <div className='bg-[#f5f5f5] h-[100vh] w-full'>
                <div className=" overflow-hidden mob:mt-[120px] min-h-[380px]">
                  <div className="grid wide pt-[16px]">
                    <div className="sm-gutter">
                      <div className="grid backR">
                        <div className="BjIo5w">
                          <div className="mcsiKT">
                            <label className="shopping_cart-checkBox">
                              <input type="checkbox" checked={allChecked} onChange={onAllCheck} />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="product">Sản Phẩm</div>
                          <div className="cost">Đơn Giá</div>
                          <div className="amount">Số Lượng</div>
                          <div className="total-cost">Số Tiền</div>
                          <div className="action text-center flex-1">Thao Tác</div>
                        </div>
                        {data?.map((item: Cart[], indexItem: any) => (
                          <section className="_48e0yS" key={indexItem}>
                            <h3 className="a11y-hidden">cart_accessibility_shop_section</h3>
                            {item.map((ele: Cart, index: number) => (
                              <>
                                <section className="Eb+POp" role="list">
                                  <div className="VPZ9zs" role="listitem">
                                    <div className="zoXdNN">
                                      <div className="lgcEHJ">
                                        <label className="shopping_cart-checkBox">
                                          <input
                                            type="checkbox"
                                            checked={checked.includes(ele.itemid)}
                                            onChange={() => onCheck(ele.itemid)}
                                          />
                                          <span className="checkmark"></span>
                                        </label>
                                      </div>
                                      <div className="eUrDQm">
                                        <div className="LAQKxn">
                                          <NavLink
                                            to={`/detailProduct/${ele.itemid}/${ele.shopid}`}
                                          >
                                            <img className="WanNdG" src={ele?.overview?.image} alt={ele?.overview?.name} />
                                          </NavLink>
                                          <div className="TyNN8t">
                                            <NavLink className="JB57cn" to={`/detailProduct/${ele.itemid}/${ele.shopid}`}>
                                              {ele?.overview?.name}
                                            </NavLink>

                                          </div>
                                        </div>
                                      </div>

                                      <div className="o7pJBk">
                                        {ele?.option !== '' && (
                                          <div className="MBOFLv">
                                            <button
                                              className="S-Rdfh"
                                              onClick={() =>
                                                selectedOption &&
                                                  selectedOption.itemIndex === indexItem &&
                                                  selectedOption.variationIndex === index
                                                  ? onHideOption()
                                                  : onShowOption(indexItem, index)
                                              }
                                            >
                                              <div className="rcEQuz">
                                                Phân loại hàng:
                                                <div className="_75YZdf" />
                                              </div>

                                              <div className="dcPz7Y">{ele?.option}</div>
                                            </button>
                                            {selectedOption &&
                                              selectedOption.itemIndex === indexItem &&
                                              selectedOption.variationIndex === index && (
                                                <div className="k6euw5 electrolyte-modal__transition-enter-done" role="dialog">
                                                  <div className="electrolyte-arrow-box__container">
                                                    <div className="electrolyte-arrow-box__arrow electrolyte-arrow-box__arrow--center">
                                                      <div className="electrolyte-arrow-box__arrow-outer">
                                                        <div className="electrolyte-arrow-box__arrow-inner" />
                                                      </div>
                                                    </div>
                                                    <div className="electrolyte-arrow-box__content">
                                                      <div className="CGxlYZ">
                                                        <div className="_5Nnpso">
                                                          <div className="o0HTfE" role="radiogroup" aria-labelledby="variation_label-Size">
                                                            <label className="_08kYJL" id="variation_label-Size">
                                                              {ele.cart_tier_variations.name}:
                                                            </label>
                                                            <div>
                                                              {JSON.parse(ele.cart_tier_variations.option)?.map(
                                                                (option: any, index_variations: number) => (
                                                                  <button
                                                                    key={index_variations}
                                                                    className={`product-variation ${option === agrsUpdate?.payload?.option
                                                                      ? 'product-variation--selected'
                                                                      : ''
                                                                      }`}
                                                                    onClick={() => onChangeOption(ele, option)}
                                                                  >
                                                                    {option}
                                                                    {option === agrsUpdate?.payload?.option && (
                                                                      <div className="product-variation__tick">
                                                                        <svg
                                                                          enableBackground="new 0 0 12 12"
                                                                          viewBox="0 0 12 12"
                                                                          x={0}
                                                                          y={0}
                                                                          className="electrolyte-svg-icon icon-tick-bold"
                                                                        >
                                                                          <g>
                                                                            <path d="m5.2 10.9c-.2 0-.5-.1-.7-.2l-4.2-3.7c-.4-.4-.5-1-.1-1.4s1-.5 1.4-.1l3.4 3 5.1-7c .3-.4 1-.5 1.4-.2s.5 1 .2 1.4l-5.7 7.9c-.2.2-.4.4-.7.4 0-.1 0-.1-.1-.1z" />
                                                                          </g>
                                                                        </svg>
                                                                      </div>
                                                                    )}
                                                                  </button>
                                                                )
                                                              )}
                                                            </div>
                                                          </div>
                                                          <div className="u2ASRs">
                                                            <button
                                                              className="electrolyte-button-solid electrolyte-button-solid--primary"
                                                              onClick={onSubmitChangeOption}
                                                            >
                                                              Xác nhận
                                                            </button>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              )}
                                            <div />
                                          </div>
                                        )}
                                      </div>

                                      <div className="G7E4B7">
                                        <div>
                                          {ele?.overview?.price_before_discount !== 0 && <span className="M-AAFK vWt6ZL">đ{formatPrice(ele?.overview?.price_before_discount)}</span>}
                                          <span className="M-AAFK">₫{formatPrice(ele?.overview?.price)}</span>
                                        </div>
                                      </div>
                                      <div className="MRh9G6">
                                        <div className="_8Xhu5+ electrolyte-input-quantity">
                                          <button
                                            className="EOdsa-"
                                            aria-label="cart_accessibility_quantity_decrease_button"
                                            onClick={() => onReduced(ele)}
                                          >
                                            <svg enableBackground="new 0 0 10 10" viewBox="0 0 10 10" x={0} y={0} className="electrolyte-svg-icon">
                                              <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5" />
                                            </svg>
                                          </button>

                                          <button className="EOdsa-" aria-label="cart_accessibility_quantity_increase_button" disabled>
                                            {+ele.amount}
                                          </button>
                                          <button
                                            className="EOdsa-"
                                            aria-label="cart_accessibility_quantity_increase_button"
                                            onClick={() => onIncrease(ele)}
                                          >
                                            <svg
                                              enableBackground="new 0 0 10 10"
                                              viewBox="0 0 10 10"
                                              x={0}
                                              y={0}
                                              className="electrolyte-svg-icon icon-plus-sign"
                                            >
                                              <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                      <div className="price_amount">
                                        <span>₫{formatPrice(ele?.overview?.price, ele?.amount)}</span>
                                      </div>
                                      <div className="mhcjog _0p-F-m">
                                        <button className="delete_btn" onClick={() => onDeleteCart(ele?.cartid)}>
                                          Xóa
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </section>
                              </>
                            ))}
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="bg-[#f5f5f5] overflow-hidden fixed z-10">
                <div className="grid wide">
                  <div className="pay">
                    <div className="pay1">
                      <div className="grid pay-container">
                        <div className="select-all">
                          <label className="shopping_cart-checkBox">
                            <input type="checkbox" checked={allChecked} onChange={onAllCheck} />
                            <span className="checkmark"></span>
                          </label>
                          <h1>Chọn tất Cả</h1>
                        </div>

                        <div className="shopping_cart-total-pay">
                          <h1>Tổng Thanh Toán</h1>
                          <h1> ({checked?.length} Sản Phẩm):</h1>
                          <span>
                            <sup>đ</sup>
                            {total.toLocaleString('it-IT')}
                          </span>
                        </div>
                        <button className="cart-btn-pay" onClick={onBuyCart}>
                          Mua Hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default memo(CartPage);
