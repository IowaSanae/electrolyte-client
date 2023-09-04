//? LIBRARY
import './category.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { CategoryTree } from '../../types/categoryTree';

interface CategoryModel {
  data: CategoryTree[];
  loading: boolean;
  settings: any;
}

function Category({ data, loading, settings }: CategoryModel) {
  return (
    <div className="col l-12 mo-12 c-12">
      <div className="category-main">
        {!loading && (
          <div className="bg-white">
            <div className="category-header">DANH MỤC</div>
            <div className="category-content">
              {data?.map((category: CategoryTree, index: number) => (
                <NavLink to={`/categories/${category.display_name}/${category.catid}`} className="category-item" key={index}>
                  <img src={`https://cf.shopee.vn/file/${category.image}`} className="category-image" alt={category.display_name} />
                  <div className="category-name">
                    <h4>{category.display_name}</h4>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default memo(Category);
