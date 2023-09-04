//? LIBRARY
import './styles/status_order.css';
import { Link, NavLink } from 'react-router-dom';
import { memo, useEffect, useState } from 'react';
//? APPS
import { Loading } from '../../components';
import { Order } from '../../types/order';
import { formatPrice } from '../../utils/formatPrice';
import { useGetOrdersQuery, useSearchOrdersQuery, useSearchTypeOrdersQuery } from '../../services/order/index.hook';
interface Tabs {
  is_all: number;
  is_cancelled: number;
  is_delivering: number;
  is_returns: number;
  is_success: number;
  is_transport: number;
  is_wait_for_pay: number;
}
function Purchase() {
  const [dataOrders, setDataOrders] = useState<Order[]>([]);
  const [tabs, setTabs] = useState<Tabs>();
  const [modal, setModal] = useState(0);
  const [borderBottom, setBorderBottom] = useState('Tất cả');
  const [shopName, setShopName] = useState('');
  const [type, setType] = useState<number>();
  const { data, isLoading } = useGetOrdersQuery();
  const { data: dataResSearchOrders, refetch: onRefetchSearch } = useSearchOrdersQuery(shopName);
  const { data: dataResSearchTypeOrders, refetch: onRefetchSearchType } = useSearchTypeOrdersQuery(type);

  useEffect(() => {
    data?.response && setDataOrders(data?.response);
    data?.tabs && setTabs(data?.tabs);
  }, [data]);

  useEffect(() => {
    dataResSearchOrders?.response && setDataOrders(dataResSearchOrders.response || []);
  }, [dataResSearchOrders]);

  useEffect(() => {
    dataResSearchTypeOrders?.response && setDataOrders(dataResSearchTypeOrders?.response || []);
  }, [dataResSearchTypeOrders]);

  const onChangeStatus = (item: any, index: number, type: any) => {
    setBorderBottom(item);
    setModal(index);
    setType(type);
    onRefetchSearchType();
  };

  const onKeyDown = (e: any) => {
    if (e.code === 'Enter' && shopName !== '') {
      onRefetchSearch();
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="col-lg-10">
        <div className="w-full mb-[12px] flex overflow-hidden bg-[#fff]">
          {[
            {
              content: 'Tất cả',
              total: tabs?.is_all,
              type: '',
            },
            {
              content: 'Đang vận chuyển',
              total: tabs?.is_wait_for_pay,
              type: 1,
            },
            {
              content: 'Hoàn thành',
              total: tabs?.is_success,
              type: 2,
            },

          ].map((tab: any, index: number) => (
            <span
              className={`delivery_status ${borderBottom === tab.content ? 'r-S3nG' : ''}`}
              key={index}
              onClick={() => onChangeStatus(tab.content, index, tab.type)}
            >
              <span className="_0rjE9m">
                {tab.content}
                <>{tab.total === 0 ? <></> : <span className="fSW3m4">({tab.total})</span>}</>
              </span>
            </span>
          ))}
        </div>

        <>
          {dataOrders?.length > 0 ? (
            <>
              {dataOrders?.map((cart: Order) => (
                <div className="hiXKxx" key={cart.orderid}>
                  <div>
                    <div className="x0QT2k">
                      <div className="FycaKn" />

                      {cart.posts.map((post: any, index: number) => (
                        <Link to="#" key={post.itemid} className="mb-[10px]">
                          <div className="_0OiaZ-">
                            <div className="FbLutl">
                              <div>
                                <span className="order_product_link">
                                  <div />
                                  <div className="order_product_container">
                                    <div className="order_product_name">
                                      <NavLink to={`/user/purchase/order/${cart.orderid}`} className="electrolyte-image__wrapper">
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
                                      </NavLink>
                                    </div>

                                    <div className="order_product_type">
                                      <NavLink to={`/user/purchase/order/${cart.orderid}`}>
                                        <div className="post_name_container">
                                          <span className="x5GTyN">{post?.name}</span>
                                        </div>
                                      </NavLink>
                                      <div>
                                        <div className="product_classification-P">Phân loại hàng: {cart?.option[index]}</div>
                                        <div className="order_product_amount">x{cart?.amount[index]}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="order_product_price_container">
                                    <div className="order_product_price_container_2">
                                      <span className="-order_product_price">
                                        <div className="shopping_cart-new-price" style={{ flexDirection: 'row', gap: '8px' }}>
                                          <h1 className="">đ{formatPrice(post?.price_before_discount, post?.amount)}</h1>đ{' '}
                                          {formatPrice(post?.price, post?.amount)}
                                        </div>
                                      </span>
                                    </div>
                                  </div>
                                </span>
                              </div>

                            </div>
                          </div>
                        </Link>
                      ))}

                      <div className="B8+ewx" />
                    </div>
                  </div>
                  <div className="O2KPzo">
                    <div className="mn7INg xFSVYg"> </div>
                    <div className="mn7INg EfbgJE"> </div>
                  </div>
                  <div className="kvXy0c">
                    <div className="-78s2g">
                      <div className="_0NMXyN">Thành tiền:</div>
                      <div className="DeWpya">₫{formatPrice(cart?.final_total)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="w-full h-[600px] text-center">
              <div
                className="flex rounded-[0.125rem] overflow-hidden flex-col justify-center w-full h-full bg-white items-center"
                style={{ boxShadow: '0 1px 1px 0 rgb(0 0 0 / 5%)' }}
              >
                <div className="A849D8">
                  <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png"
                    alt="emptyOrder"
                  />
                </div>
                <div className="text-[1.125rem] leading-[1.4rem] mt-[20px]" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Chưa có đơn hàng
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
}
export default memo(Purchase);
