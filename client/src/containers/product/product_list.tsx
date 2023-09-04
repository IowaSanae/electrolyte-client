//? LIBRARY
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

//? APPS
import { PostSimple } from '../../types/post';
import { formatPrice } from '../../utils/formatPrice';
import { SkeletonProduct } from '../../components';
import { generateStart } from '../../utils/generateStart';
import { useAppDispatch } from '../../hooks/hooks';
import { updateHeartTrue, updateHeartFalse } from '../../redux/otherSlice';
import { AppDispatch } from '../../app/store';
interface HomeProducts {
  items: PostSimple[];
  col: string;
  loading: boolean;
}
function ProductList({ items, col, loading }: HomeProducts) {
  const dispatch: AppDispatch = useAppDispatch();
  const [likes, setLikes] = useState<string[]>(items.map(() => 'fa-regular fa-heart'));
  const changeLike = (index: number) => {
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];

      if (prevLikes[index] === 'fa-solid fa-heart') {
        newLikes[index] = 'fa-regular fa-heart';
        dispatch(updateHeartFalse());
      } else {
        newLikes[index] = 'fa-solid fa-heart';
        dispatch(updateHeartTrue());
        setTimeout(() => {
          dispatch(updateHeartFalse());
        }, 1400);
      }
      return newLikes;
    });
  };

  return (
    <div className="Home-product">
      <div className="row sm-gutter">
        {items?.map((item: PostSimple, index: number) => {
          return (
            <div className={col} key={index}>
              {loading ? (
                <SkeletonProduct />
              ) : (
                <div className="Home-product-item" key={item.itemid}>
                  <LazyLoadImage effect="blur" src={item.image} alt="itemProduct" className="Home-product-item_img" />
                  <NavLink to={`/detailProduct/${item?.itemid}/${item?.shopid}`} className="Home-product-item-name">
                    {item?.name}
                  </NavLink>
                  <div className="Home-product-item_price">
                    {item?.price_before_discount !== 0 ? (
                      <span className="Home-product-item_price-old">{formatPrice(item.price_before_discount)}đ</span>
                    ) : (
                      <span className="Home-product-item_price-old"></span>
                    )}

                    <span className="Home-product-item_price-current">{formatPrice(item?.price)}đ</span>
                  </div>
                  <div className="Home-product-item_actiton">
                    <span className="Home-product-item_like Home-product-item_liked" onClick={() => changeLike(index)}>
                      <i className={likes[index]}></i>
                    </span>
                    <div className="Home-product-item_rating">{generateStart(4)}</div>
                    <span className="Home-product-item-sold">Đã bán {item?.historical_sold}</span>
                  </div>
                  {item.discount ? (
                    <div className="Home-product-item_sale-off">
                      <span className="Home-product-item_sale-off-percent">{item.discount}</span>
                      <br></br><span className="Home-product-item_sale-off-label">Giảm</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default memo(ProductList);
