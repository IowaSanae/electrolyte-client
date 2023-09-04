//? LIBRARY
import './style/index.css';
import { memo, useEffect, useState } from 'react';
import { Loading } from '../../components';
import { useGetOrderQuery } from '../../services/order/index.hook';
import { Order } from '../../types/order';
import { NavLink, useParams } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import { ModelRating } from '../../containers';
import { formatDate } from '../../utils/formatTimestamp';

function OrderDetail() {
  const params = useParams();
  const { data, isLoading } = useGetOrderQuery(params);
  const [dataOrder, setDataOrder] = useState<Order>();
  const [isShowModel, setIsShowModel] = useState(false);
  useEffect(() => {
    data?.response && setDataOrder(data?.response);
  }, [data]);
  const onShowModel = () => setIsShowModel(true);
  const onCloseModel = () => setIsShowModel(false);
  return (
    <>
      {isLoading && <Loading />}
      <div className="col-lg-10 bg-white pl-0 pr-0">
        <div className="order_details_container">
          <div className="header_order_detail">
            <div className="return_btn">
              <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x={0} y={0} className="electrolyte-svg-icon icon-arrow-left">
                <g>
                  <path d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z" />
                </g>
              </svg>
              <NavLink to="/user/purchase">TRỞ LẠI</NavLink>
            </div>
            <div className="order_ID">
              <span>MÃ ĐƠN HÀNG. {dataOrder?.orderid}</span>

            </div>
          </div>

          <div className="order_process">
            <div className="stepper">
              <div className="stepper__step stepper__step--finish ">
                <div className="stepper__step-icon stepper__step-icon--pending">
                  <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x={0} y={0} className="electrolyte-svg-icon icon-order-order">
                    <g>
                      <path
                        d="m5 3.4v23.7c0 .4.3.7.7.7.2 0 .3 0 .3-.2.5-.4 1-.5 1.7-.5.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1s1.7.4 2.2 1.1c.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.9 0 1.7.4 2.2 1.1.2.2.3.4.5.4s.3-.2.5-.4c.5-.7 1.4-1.1 2.2-1.1.7 0 1.2.2 1.7.5.2.2.3.2.3.2.3 0 .7-.4.7-.7v-23.7z"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <g>
                        <line fill="none" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={3} x1={10} x2={22} y1="11.5" y2="11.5" />
                        <line fill="none" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={3} x1={10} x2={22} y1="18.5" y2="18.5" />
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="stepper__step-text">Đơn hàng đã đặt</div>
                {dataOrder?.createdAt && <div className="stepper__step-date"> {formatDate(dataOrder?.createdAt)}</div>}
              </div>
              <div className="stepper__step stepper__step--finish">
                <div className="stepper__step-icon stepper__step-icon--finish">
                  <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x={0} y={0} className="electrolyte-svg-icon icon-order-paid">
                    <g>
                      <path
                        clipRule="evenodd"
                        d="m24 22h-21c-.5 0-1-.5-1-1v-15c0-.6.5-1 1-1h21c .5 0 1 .4 1 1v15c0 .5-.5 1-1 1z"
                        fill="none"
                        fillRule="evenodd"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <path
                        clipRule="evenodd"
                        d="m24.8 10h4.2c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1h-21c-.6 0-1-.4-1-1v-4"
                        fill="none"
                        fillRule="evenodd"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <path
                        d="m12.9 17.2c-.7-.1-1.5-.4-2.1-.9l.8-1.2c.6.5 1.1.7 1.7.7.7 0 1-.3 1-.8 0-1.2-3.2-1.2-3.2-3.4 0-1.2.7-2 1.8-2.2v-1.3h1.2v1.2c.8.1 1.3.5 1.8 1l-.9 1c-.4-.4-.8-.6-1.3-.6-.6 0-.9.2-.9.8 0 1.1 3.2 1 3.2 3.3 0 1.2-.6 2-1.9 2.3v1.2h-1.2z"
                        stroke="none"
                      />
                    </g>
                  </svg>
                </div>
                <div className="stepper__step-text">Đơn hàng đã thanh toán</div>
              </div>
              <div className="stepper__step stepper__step--finish">
                <div className="stepper__step-icon stepper__step-icon--finish">
                  <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x={0} y={0} className="electrolyte-svg-icon icon-order-shipping">
                    <g>
                      <line
                        fill="none"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                        x1="18.1"
                        x2="9.6"
                        y1="20.5"
                        y2="20.5"
                      />
                      <circle cx="7.5" cy="23.5" fill="none" r={4} strokeMiterlimit={10} strokeWidth={3} />
                      <circle cx="20.5" cy="23.5" fill="none" r={4} strokeMiterlimit={10} strokeWidth={3} />
                      <line fill="none" strokeMiterlimit={10} strokeWidth={3} x1="19.7" x2={30} y1="15.5" y2="15.5" />
                      <polyline
                        fill="none"
                        points="4.6 20.5 1.5 20.5 1.5 4.5 20.5 4.5 20.5 18.4"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <polyline
                        fill="none"
                        points="20.5 9 29.5 9 30.5 22 24.7 22"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                    </g>
                  </svg>
                </div>
                <div className="stepper__step-text">Đã giao cho ĐVVC</div>
              </div>
              <div className="stepper__step stepper__step--finish">
                <div className="stepper__step-icon stepper__step-icon--finish">
                  <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x={0} y={0} className="electrolyte-svg-icon icon-order-received">
                    <g>
                      <polygon
                        fill="none"
                        points="2 28 2 19.2 10.6 19.2 11.7 21.5 19.8 21.5 20.9 19.2 30 19.1 30 28"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <polyline
                        fill="none"
                        points="21 8 27 8 30 19.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <polyline
                        fill="none"
                        points="2 19.2 5 8 11 8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                      />
                      <line
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit={10}
                        strokeWidth={3}
                        x1={16}
                        x2={16}
                        y1={4}
                        y2={14}
                      />
                      <path d="m20.1 13.4-3.6 3.6c-.3.3-.7.3-.9 0l-3.6-3.6c-.4-.4-.1-1.1.5-1.1h7.2c.5 0 .8.7.4 1.1z" stroke="none" />
                    </g>
                  </svg>
                </div>
                <div className="stepper__step-text">Đã nhận được hàng</div>
              </div>
              <div className="stepper__step stepper__step-icon--finish">
                <div className="stepper__step-icon stepper__step-icon--finish">
                  <svg enableBackground="new 0 0 32 32" viewBox="0 0 32 32" x={0} y={0} className="electrolyte-svg-icon icon-order-rating">
                    <polygon
                      fill="none"
                      points="16 3.2 20.2 11.9 29.5 13 22.2 19 24.3 28.8 16 23.8 7.7 28.8 9.8 19 2.5 13 11.8 11.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeWidth={3}
                    />
                  </svg>
                </div>
                <div className="stepper__step-text">đánh giá</div>
              </div>
              <div className="stepper__line">
                <div className="stepper__line-background" style={{ background: 'rgb(224, 224, 224)' }} />
                <div
                  className="stepper__line-foreground"
                  style={{
                    width: 'calc((100% - 140px) * 1)',
                    background: '#1ba8ff',
                  }}
                />
              </div>
            </div>
          </div>
          <div className="O2KPzo">
            <div className="mn7INg xFSVYg"> </div>
            <div className="mn7INg EfbgJE"> </div>
          </div>
          <div>
            <div className="rating_btn_section">
              <div className="-space_section">
              </div>
              <div className="rating_section" onClick={onShowModel}>
                <button className="stardust-button stardust-button--primary cf_btn">Đánh giá</button>
              </div>
            </div>
          </div>
          <div className="O2KPzo">
            <div className="mn7INg xFSVYg"> </div>
            <div className="mn7INg EfbgJE"> </div>
          </div>
          <div>
            <div className="delivery_info">
              <div className="received_address">
                <div className="address_header">Địa chỉ nhận hàng</div>
              </div>
              <div className="user_order_info">
                <div className="iWu+Gv">
                  <div className="order_username">{dataOrder?.user?.name}</div>
                  <div className="order_userphone">
                    <span>(+84) {dataOrder?.user?.phone}</span>

                    <br />
                    {dataOrder?.user?.address}
                  </div>
                </div>
                <div className="ifE+r-">
                  <div>

                    <div className="order_tracking-N">

                      <div className="tracking_info">
                        <div className="order_tracking_date">
                          <img className="order_icon" title="image" src="https://cf.shopee.vn/file/order_placed_3x" alt="" />
                        </div>
                        {dataOrder?.createdAt && <div className="tracking_date_format"> {formatDate(dataOrder?.createdAt)}</div>}

                        <div className="order_tracking_status">
                          <p className="order_tracking_history">Đơn đã đặt</p>
                          <p>Đơn hàng đã được đặt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!isLoading && (
            <div>
              <div>
                <div className="order_info_section">
                  <div className="FbLutl">
                    {dataOrder?.posts.map((post: any, index: number) => (
                      <div key={post.itemid}>
                        <NavLink className="order_product_link" to={`/detailProduct/${post?.itemid}/${post?.shopid}`}>
                          <div />
                          <div className="order_product_container">
                            <div className="order_product_name">
                              <div className="electrolyte-image__wrapper">
                                <div className="shopping_cart-img">
                                  <img src={post?.image} alt={post?.name} />
                                </div>
                                <div
                                  className="electrolyte-image__content"
                                  style={{
                                    backgroundImage: `${post?.image}`,
                                  }}
                                >
                                  <div className="electrolyte-image__content--blur"> </div>
                                </div>
                              </div>
                            </div>

                            <div className="order_product_type">
                              <div>
                                <div className="post_name_container">
                                  <span className="x5GTyN">{post?.name}</span>
                                </div>
                              </div>
                              <div>
                                <div className="product_classification-P">Phân loại hàng: {dataOrder?.option[index]}</div>
                                <div className="order_product_amount">x{dataOrder?.amount[index]}</div>
                              </div>
                            </div>
                          </div>
                          <div className="order_product_price_container">
                            <div className="order_product_price_container_2">
                              <span className="-order_product_price">₫ {formatPrice(post?.price, post?.amount)}</span>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    ))}

                  </div>
                </div>
                <div className="total_price_details">
                  <div className="order_price_details">
                    <div className="details_info">
                      <span>Tổng tiền hàng</span>
                    </div>
                    <div className="price_number">{dataOrder?.final_total && <div> đ{formatPrice(dataOrder?.final_total - 30000, 1)}</div>}</div>
                  </div>
                  <div className="order_price_details">
                    <div className="details_info">
                      <span>Phí vận chuyển</span>
                    </div>
                    <div className="price_number">
                      <div>₫{formatPrice(30000, 1)}</div>
                    </div>
                  </div>
                  <div className="order_price_details">
                    <div className="details_info ">
                      <span>Thành tiền</span>
                    </div>
                    <div className="price_number">
                      {dataOrder?.final_total && <div className="final_total_price">₫{formatPrice(dataOrder.final_total)}</div>}
                    </div>
                  </div>
                </div>
                {dataOrder?.final_total && (
                  <div className="order_notice">
                    <svg height={16} width={16} viewBox="0 0 16 16" className="electrolyte-svg-icon _5Fq+5W text-[#ffbf00]">
                      <g fillRule="evenodd">
                        <path
                          d="m8 15c-3.8596721 0-7-3.1397891-7-6.9994612 0-3.8602109 3.1403279-7.0005388 7-7.0005388 3.8602109 0 7 3.1403279 7 7.0005388 0 3.8596721-3.1397891 6.9994612-7 6.9994612z"
                          fill="none"
                          strokeWidth={1}
                          stroke="currentColor"
                        />
                        <path
                          d="m10.4132188 9.3999583h-5.050999c-.204396 0-.3841766-.1081321-.4918691-.297583-.0404396-.0712089-.1556047-.3239567.0413188-.6303309.0694507-.1248354.1643959-.2835171.2738467-.4593416.1050552-.1701102.1969235-.3371435.2791214-.5112098.086154-.1789015.1617586-.3705502.2259345-.5709901.0553847-.1771432.0839562-.3674733.0839562-.5652758 0-.2738467.0404396-.5287923.1204398-.7556059.075165-.2197807.1797806-.4193415.3098907-.5934078.125275-.1674729.2747258-.3151655.4457152-.4382426.1397805-.0989013.2826379-.1775828.4276932-.2369235.6247463-.29029 1.6628604-.0523078 1.6487945.0083517.1424179.0589012.2707698.1279123.3890118.2096707.1767036.1217585.333627.2747258.4646163.4540668.1283519.1784619.2312092.3810997.3050556.6013199.0760441.2232971.1147255.4738471.1147255.7437377 0 .1912092.0281319.3802205.0848353.5626385.0637364.2052751.1397805.3995612.2268136.5780231.0887914.1850553.1832971.3542864.2821984.5050559.1046156.1604399.1982421.297583.2826379.4123085.0874727.1160442.1296706.2505499.122198.3876931-.0061539.1107695-.0404396.2162642-.0989013.3041764-.0562639.0870331-.1305497.1591212-.2101103.2026378-.0685716.0404396-.1665937.0892309-.2769236.0892309zm-3.9906114.7572683h3.0423323c-.1878895.8170573-.6949449 1.2255859-1.5211662 1.2255859s-1.3332766-.4085286-1.5211662-1.2255859z"
                          stroke="none"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="order_notice_details">
                      <span>
                        Vui lòng thanh toán <span className="order_notice_price">₫{formatPrice(dataOrder?.final_total)}</span> khi nhận hàng.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="confirm_paymetn_method_container">

            <div className="order_price_details">
              <div className="details_info">
                <span className="flex gap-[5px] items-center">
                  <span className="payment_method_title">Phương thức Thanh toán</span>
                </span>
              </div>
              <div className="price_number">
                <div>Thanh toán khi nhận hàng</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dataOrder && <ModelRating isShow={isShowModel} onCloseModel={onCloseModel} data={dataOrder} />}
    </>
  );
}
export default memo(OrderDetail);
