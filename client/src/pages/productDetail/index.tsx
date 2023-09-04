//? LIBRARY
import './style/product_item.css';
import './style/index2.css';
import './style/index.css';
import './style/product_comment.css';
import './style/product_Des.css';
import './style/product_shop.css';
// import './style/produc-img.css';
import './style/product_img-mobile.css';
import ICON from '../../assets/icons';
import { memo, useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

//? SERVICES
import { ProductComment, ProductBreadcrumb } from '../../containers';
import { Loading2 } from '../../components';
import { AppDispatch } from '../../app/store';
import { useAppDispatch } from '../../hooks/hooks';
import { toast } from 'react-hot-toast';
import { CartActions } from '../../redux/cart.slice';
import { formatPrice } from '../../utils/formatPrice';
import { generateStart } from '../../utils/generateStart';
import { useGetProductQuery } from '../../services/post/index.hook';
import { useCreateCartMutation, useGetCartsQuery } from '../../services/cart/index.hook';

function DetailProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const [animationAddCart] = useState('cartAnimation');
  const [showImg, setShowImg] = useState(false);
  const [indexImg, setIndexImg] = useState(0);
  const [amount, setAmount] = useState(1);
  const [NewOption, setNewOption] = useState(undefined || '');
  const [showTableSize, setShowTableSize] = useState(false);
  const { data, isLoading } = useGetProductQuery(params);
  const { data: dataCart, refetch: FetchCarts } = useGetCartsQuery();
  const [createCart] = useCreateCartMutation();

  const onIncrease = () => {
    setAmount(amount + 1);
  };

  const onReduced = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
    if (amount < 1) {
      setAmount(1);
    }
  };

  const onAddToCart = async () => {
    if (NewOption === '' && data?.response?.tier_variations?.name) {
      return toast.error('Vui lòng chọn sản phẩm');
    }
    const payload = {
      itemid: params.itemid,
      shopid: params.shopid,
      amount: amount,
      option: NewOption || '',
    };
    const response = await createCart(payload).unwrap();
    if (response.err === 0) {
      toast.success('Bạn vừa thêm 1 sản phẩm vào giỏ hàng');
      FetchCarts();
    }
  };
  const isEmptyObject = (obj: any) => {
    if (obj === undefined || obj === null) {
      return true;
    }
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    dataCart?.total_cart && dispatch(CartActions.updateTotalCart(dataCart?.total_cart));
  }, [dataCart]);
  return (
    <>
      {isLoading ? (
        <Loading2 />
      ) : (
        <>
          <div className=" Hide-on-mobile mt-[120px]"></div>
          <div className="bg-[#f5f5f5] overflow-hidden App__Container_padding-Button py-[20px]">
            <ProductBreadcrumb data={data?.response} />
            <div className="grid wide">
              <div className="row sm-gutter pb-[30px] bg-[white]">
                <div className="col c-12 mo-5 l-5">
                  <div className="product_cart-img">
                    <img className="product_cart-img-re" src={data?.response?.image} alt="" onClick={() => setShowImg(true)} />
                    <img className={animationAddCart} src={data?.response?.image} alt="animationAddCart" onClick={() => setShowImg(true)} />
                  </div>
                  <div className="container-fluid Hide-on-mobile">
                    <div className="row sm-gutter">
                      <div className="col s-12 c-12  l-12 disp">
                        {data?.response?.images.map((image: string, index: number) => {
                          return (
                            <div className="product_cart-list" key={index}>
                              <img src={image} alt="MobileImgProduct" onClick={() => setShowImg(true)} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col c-12  mo-7 l-7 ">
                  <div className="p-[10px] mob:pt-[20px] ">
                    <div className="product-items-heding ">
                      <h2>
                        {data?.response?.name}
                      </h2>
                    </div>
                    <div className="product-items-content">
                      <div className="product-items-content-rating">
                        <h3>{data?.response?.shop_info?.rating_star?.toFixed(1)}</h3>
                        <div className="product-items-content-rating-icons">{generateStart(5)}</div>
                      </div>
                      <div className="product-items-content-evaluat">
                        <h3>47</h3>
                        <h4>Đánh Giá</h4>
                      </div>
                      <div className="product-items-content-sold">
                        <h3>{data?.response?.historical_sold}</h3>
                        <h4>Đã bán</h4>
                      </div>
                    </div>
                    <div className="product-items-price">
                      <div className="product-items-old-price">
                        {data?.response?.price_before_discount !== 0 ? (
                          <h3>
                            <sup>đ</sup>
                            {formatPrice(data?.response?.price_min_before_discount)}
                          </h3>
                        ) : (
                          <h3>
                            <sup></sup>
                          </h3>
                        )}
                      </div>
                      <div className="product-items-new-price">
                        {data?.response?.price_min === data?.response?.price_max ? (
                          <h3>
                            <sup>đ</sup>
                            {formatPrice(data?.response?.price_min)}
                          </h3>
                        ) : (
                          <h3>
                            <sup>đ</sup>
                            {formatPrice(data?.response?.price_min)}- <sup>đ</sup>
                            {formatPrice(data?.response?.price_max)}
                          </h3>
                        )}
                      </div>
                      {data?.response?.discount && <span>{data?.response?.discount} giảm </span>}
                    </div>
                    <div className="container-fluid container-detail">

                      {!isEmptyObject(data?.response?.tier_variations) && (
                        <>
                          <div className="product_cart-variation mt-[5px]">
                            <h3>{data?.response?.tier_variations?.name}</h3>
                          </div>
                          <div className="product_cart-option">
                            {data?.response?.tier_variations?.options?.map((option: any, index: any) => (
                              <div className="product_cart-variation" key={index}>
                                <button
                                  className={`${NewOption === option ? 'product_cart-variation-active' : ''}`}
                                  onClick={() => setNewOption(option)}
                                >
                                  {option}
                                </button>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {showTableSize && (
                        <div className="product_cart-size-chart" onClick={() => setShowTableSize(false)}>
                          <div className=" modal__size">
                            <div className="modal__body">
                              <img src={data?.response?.size_chart} alt="tableSize" />
                            </div>
                          </div>
                        </div>
                      )}
                      <>
                        <div className="product_cart-amount">
                          <h3>số lượng</h3>
                        </div>
                        <div className="product_cart-amount">
                          <div className="product_cart-amount-button">
                            <button onClick={onReduced}>{ICON.MINUS}</button>
                            <button>{amount}</button>
                            <button onClick={onIncrease}>{ICON.PLUS}</button>
                          </div>
                          <h2>{data?.response?.stock} sản phẩm có sẵn</h2>
                        </div>
                      </>
                    </div>
                    <div className="product_cart ">
                      <button className="product_cart-button" onClick={onAddToCart}>
                        <span className="cart-plus-animation">{ICON.CART}</span>Thêm Vào Giỏ Hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {showImg && (
              <div className="image Hide-on-mobile">
                <div className="image-overLay">
                  <div className="image-slice">
                    <div>
                      <img src={data?.response?.images[indexImg]} alt="img" />
                    </div>
                  </div>
                  <div className="image-slices">
                    <div className="l-12 mo-12 c-12">
                      <div className="image-slices-icon" onClick={() => setShowImg(false)}>
                        {ICON.CIRCLE_XMARK}
                      </div>
                      <div className="image-slices-heading">
                        <h2>{data?.response?.name}</h2>
                      </div>
                      <div className="image-slices-items">
                        {data?.response?.images.map((image: string, index: number) => {
                          return <img src={image} onClick={() => setIndexImg(index)} key={index} alt="" />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-[#f5f5f5] overflow-hidden py-[12px]">
            <div className="grid wide">
              <div className="row gap-[-20px]">
                <div className="col-lg-10" style={{width: "100%"}}>
                  {!isEmptyObject(data?.response?.attributes) && (
                    <div className="wrapper">
                      <div className="productDes_inner">
                        <div className="productDes-heading">CHI TIẾT SẢN PHẨM</div>
                        <div className="productDes_container">
                          <div className="productDes-title">
                            <label>Danh Mục</label>
                            <div className="flex flex-wrap">
                              <div className="productDes-title-detail">
                                <span>
                                  <NavLink to="# ">{data?.response?.categories?.category_name || 'N/A'}</NavLink>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="productDes-content">
                            {!isEmptyObject(data?.response?.attributes) && (
                              <>
                                {data?.response.attributes?.option.map((attribute: any, index: any) => (
                                  <div className="dR8kXc" key={index}>
                                    <label className="zquA4o eqeCX7">{attribute.name}</label>
                                    <div>{attribute.value}</div>
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="productDes-detail">
                          <div className="productDes-heading">MÔ TẢ SẢN PHẨM</div>
                          <div className="productDes-heading-des">
                            <p>{data?.response?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-[#f5f5f5] overflow-hidden py-[12px]">
                    <div className="grid wide">
                      <div className="row">
                        <div className="col-lg-12">
                          <ProductComment />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default memo(DetailProduct);
