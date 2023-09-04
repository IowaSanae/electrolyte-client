//? LIBRARY

import { memo } from 'react';
import { NavLink } from 'react-router-dom';

interface ProductBreadcrumbModel {
  data: any;
}
function ProductBreadcrumb({ data }: ProductBreadcrumbModel) {
  return (
    <div className="items-center RnKf-X page-product__breadcrumb grid wide " style={{ marginBottom: '1.5rem' }}>
      <NavLink className="category_link" to="/">
        Electrolyte
      </NavLink>

      <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x={0} y={0} className="electrolyte-svg-icon xprSzi icon-arrow-right">
        <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
      </svg>
      <NavLink className="category_link" to={`/categories/${data?.categories.category_name}/${data?.categories.catid}`}>
        {data?.categories.category_name}
      </NavLink>

      <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x={0} y={0} className="electrolyte-svg-icon xprSzi icon-arrow-right">
        <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z" />
      </svg>
      <span className="KmiQIK">{data?.name}</span>
    </div>
  );
}
export default memo(ProductBreadcrumb);
