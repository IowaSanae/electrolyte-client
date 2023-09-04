//? LIBRARY
import IMG from '../../assets/imgs';
import ICON from '../../assets/icons';
import { NavLink } from 'react-router-dom';
//? APPS
import { Cart } from '../../types/cart';
import { formatPrice } from '../../utils/formatPrice';

interface HeaderCartModel {
  totalCart: number;
  data: [Cart[]];
  loading: boolean;
}

function HeaderCart({ data, totalCart, loading }: HeaderCartModel) {
  return (
    <NavLink to="/cart" className="Header-cart">
      <div className="Header-cart-wrap">
        <span className="Header-cart-icon">{ICON.SHOPPING_CART}</span>
        {totalCart === 0 || totalCart === undefined ? <span></span> : <span className="Header-cart-notice">{totalCart}</span>}
        <div className="Header-cart-list">
          {totalCart > 0 ? (
            <>
              <h4 className="Header_cart-heading">Sản phẩm đã thêm</h4>
              {!loading && (
                <ul className="Header_cart-list-item">
                  {data?.map((item: Cart[], index: number) => {
                    return (
                      <div key={index}>
                        {item.map((ele: Cart, index: number) => (
                          <li className="Header_cart-item" key={index}>
                            <img className="Header_cart-item-img" src={ele?.overview?.image} alt="dataCart" />
                            <div className="Header_cart-item-info">
                              <div className="Header_cart-item-head">
                                <h5 className="Header_cart-item-name">{ele?.overview?.name}</h5>
                                <div>
                                  <span className="Header_cart-item-price">đ{formatPrice(ele?.overview?.price)}</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </div>
                    );
                  })}
                </ul>
              )}

              <button className="btn Header_cart-view-cart btn--prinary">
                <NavLink to="/cart"> Xem giỏ hàng</NavLink>
              </button>
            </>
          ) : (
            <div className="Header-cart--no-cart">
              <img src={IMG.NO_CART} alt="noCart" className="Header-cart--no-cart-img" />
              <p className="Header-cart-list-no-cart-msg">Chưa có sản phẩm</p>
            </div>
          )}
        </div>
      </div>
    </NavLink>
  );
}
export default HeaderCart;
