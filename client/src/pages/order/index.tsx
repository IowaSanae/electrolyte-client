//? LIBRARY
import './styles/order.css';
import './styles/payment_Methods.css';
import ICON from '../../assets/icons';
import IMG from '../../assets/imgs';
import toast from 'react-hot-toast';
import { useState, memo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
//? APPS
import { Cart } from '../../types/cart';
import { Loading2 } from '../../components';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../hooks/hooks';
import { formatPrice } from '../../utils/formatPrice';
import { ALERT_INVALID_ADDRESS_ORDER, ALERT_INVALID_PHONE_ORDER } from '../../constants/msg';
import { useDeleteCartMutation } from '../../services/cart/index.hook';
import { useCreateOrderMutation } from '../../services/order/index.hook';

interface payload {
  item_groups_id: string;
  amount: string;
  option: string;
  final_total: number;
  total_num_items: number;
  note: string;
  shopid: number;
  shop_name: string;
}

function Order() {
  const ship = 30000;
  const navigate = useNavigate();
  const { data } = useAppSelector((state: RootState) => state.buyCart);
  const { data: dataUser } = useAppSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalShip, setTotalShip] = useState(0);
  const [dataPayload, setDataPayload] = useState<payload[]>([]);
  const [banners, setBanners] = useState(false);
  const [variation, setVariation] = useState(undefined);
  const [deleteCart] = useDeleteCartMutation();
  const [createOrder] = useCreateOrderMutation();
  useEffect(() => {
    const dataTempt: Cart[] = [];
    data?.forEach((item: any) => {
      item.forEach((element: Cart) => {
        dataTempt.push(element);
      });
    });
    setTotalShip((data?.length ?? 1) * ship);
    setTotal(dataTempt.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0));

    if (dataTempt.length === 0) {
      navigate('/cart');
    }
    const newData = data.map((item: Cart[]) => {
      return {
        item_groups_id: JSON.stringify(item.map((ele) => ele.itemid)),
        amount: JSON.stringify(item.map((ele) => ele.amount)),
        option: JSON.stringify(item.map((ele) => ele.option)),
        final_total: item.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0) + ship,
        shopid: item[0]?.shopid,
        shop_name: item[0]?.overview?.shop_name,
        total_num_items: item.length,
        note: '',
      };
    });

    setDataPayload(newData);
  }, [data, ship, navigate]);

  const handleChangeVariation = (item: any, index: any) => {
    setVariation(item);
    setBanners(index === 0);
  };
  const updateNote = (newNote: string, index: number) => {
    dataPayload[index].note = newNote;
  };

  const handelSubmit = async () => {
    try {
      if (!dataUser.phone) {
        return (
          toast.error(ALERT_INVALID_PHONE_ORDER),
          setTimeout(() => {
            navigate('/user/profile');
          }, 3000)
        );
      }
      if (!dataUser.address) {
        return (
          toast.error(ALERT_INVALID_ADDRESS_ORDER),
          setTimeout(() => {
            navigate('/user/profile');
          }, 3000)
        );
      }
      setLoading(true);
      const response = await createOrder(dataPayload).unwrap();
      if (response.err === 0) {
        toast.success(response.msg);
        for (const item of data) {
          for (const ele of item) {
            deleteCart(ele.cartid).unwrap();
            setTimeout(() => {
              navigate('/user/purchase');
            }, 3000);
          }
        }
      }
    } catch (err: any) {
      toast.error(err.msg.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading2 />}
      <div className="p-[1.25rem] mt-[120px]" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="order-border"></div>
        <div className="order-info">
          <h1>{ICON.LOCATION}Địa Chỉ Nhận Hàng</h1>
          <div>
            <div className="order-name">
              {dataUser.name} {dataUser.phone ? `SĐT: (+84) ${dataUser.phone}` : ''}
            </div>

            <div className="order-name">{dataUser.phone ? `Mặc Định: ${dataUser.address} ` : ''}</div>
            <NavLink to="/user/profile">Thay Đổi</NavLink>
          </div>
        </div>

        <>
          {data?.map((ele: Cart[], index: number) => (
            <div key={index}>
              <div className="table-body-list">
                <div>
                  {ele?.map((item: Cart) => (
                    <div className="grid orderR2" key={item.cartid}>
                      <div className="shopping_cart">
                        <div className="shopping_cart-img-order">
                          <img src={item?.overview?.image} alt={item?.overview?.name} />
                        </div>
                        <div className="shopping_cart-img-title-order">
                          <div className="title-order-content">{item?.overview?.name}</div>
                          <div className="flex"></div>
                          <div className="shopping_cart-0ld-price px-[5px]">
                            <h2>đ {formatPrice(item?.overview?.price_max)}</h2>
                          </div>
                          <div className="px-[5px] text-center">x{item.amount}</div>
                          <div className="shopping_cart-new-price px-[5px]">đ {formatPrice(item?.overview?.price, item?.amount)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-container">
                <div className="order-ship">
                  <div className="order-shipping-unit">
                    <span>Vận chuyển nhanh</span>
                    <p></p>
                    <label></label>
                    <h2> đ {ship.toLocaleString('it-IT')}</h2>
                  </div>
                  <div className="order-received-date">
                    <p>Nhận hàng trong 3 đến 5 ngày</p>
                  </div>
                </div>
              </div>
              <div className="order-price">
                <span>Tổng số tiền ({ele?.reduce((acc: any, curr: any) => acc + curr.amount, 0)} sản phẩm):</span>
                <label>đ{(ele?.reduce((acc, curr) => acc + curr.overview.price * curr.amount, 0) + ship).toLocaleString('it-IT')}</label>
              </div>
            </div>
          ))}
        </>

        <div className="checkout-payment-method-view__current checkout-payment-setting">
          <div className="checkout-payment-method-view__current-title">Phương thức thanh toán</div>
          <div className="checkout-payment-setting__payment-methods-tab">
            {['Thanh toán khi nhận hàng'].map((item, index) => (
              <button
                className={`product-variation ${variation === item ? 'product-variation--selected' : ''}`}
                onClick={() => {
                  handleChangeVariation(item, index);
                }}
                key={index}
              >
                {item}
                {variation === item ? <div className="product-variation__tick">{ICON.HEART}</div> : null}
              </button>
            ))}
          </div>
        </div>

        <div className="order-pay">
          <div>
            <div className="order-pay-inner">
              <div></div>
              <div className="order-pay-content">
                <h3>Tổng tiền hàng</h3>
                <h3>Phí vận chuyển</h3>
                <h3>Tổng thanh toán:</h3>
              </div>
              <div className="order-pay-content">
                <h3>đ{formatPrice(total)}</h3>
                <h3>đ{formatPrice(totalShip)}</h3>
                <h1>₫{formatPrice(total, 0, totalShip)}</h1>
              </div>
            </div>
            <div className="order-pay-footer">
              <button onClick={handelSubmit}>Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Order);
