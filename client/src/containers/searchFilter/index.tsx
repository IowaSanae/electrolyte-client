//? LIBRARY
import './style/index.css';
import { memo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
//? APPS
import { useGetCategoryTreeParentQuery } from '../../services/category/index.hook';

function SearchFilter() {
  const params = useParams();
  const { data, isLoading } = useGetCategoryTreeParentQuery(params);

  return (
    <div className="electrolyte-filter-panel">
      {params.display_name && (
        <div className="electrolyte-category-list">
          <NavLink className="electrolyte-category-list__header" to="/">
            Tất cả Danh mục
          </NavLink>
          <div className="electrolyte-category-list__body">
            <div className="electrolyte-category-list__category">
              <div className="electrolyte-category-list__main-category electrolyte-category-list__main-category--active">
                <NavLink className="electrolyte-category-list__main-category__link" to="/">
                  <svg
                    viewBox="0 0 4 7"
                    className="electrolyte-svg-icon electrolyte-category-list__main-category__caret icon-down-arrow-right-filled"
                  >
                    <polygon points="4 3.5 0 0 0 7" />
                  </svg>
                  {params.display_name}
                </NavLink>
              </div>
              {!isLoading && (
                <>
                  {data?.response?.map((item: any, index: number) => {
                    return (
                      <NavLink className="electrolyte-category-list__sub-category" to="/" key={index}>
                        {item?.display_name}
                      </NavLink>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div />
    </div>
  );
}
export default memo(SearchFilter);
