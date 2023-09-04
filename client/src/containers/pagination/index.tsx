//? LIBRARY
import './style/pagination.css';
import { memo } from 'react';
import ReactPaginate from 'react-paginate';
//? APPS

function Pagination({ setPayload, totalPage }: { setPayload: any; totalPage: number | undefined }) {
  const handleClickPage = (e: any) => {
    setPayload((prev: any) => {
      return {
        ...prev,
        page: e.selected + 1,
      };
    });
  };
  if (typeof totalPage === 'undefined') {
    return null;
  }
  return (
    <ReactPaginate
      previousLabel={
        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="electrolyte-svg-icon icon-arrow-right rotate-180">
          <path d="m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z"></path>
        </svg>
      }
      previousClassName={'text-[#939393]'}
      pageCount={totalPage}
      breakLabel={'...'}
      marginPagesDisplayed={3}
      pageRangeDisplayed={6}
      onPageChange={(e) => {
        handleClickPage(e);
      }}
      containerClassName={'Pagination Home-product-pagination items-center'}
      pageClassName={'Pagination-item'}
      pageLinkClassName={'Pagination-item_link'}
      activeClassName={'Pagination-item_link-active'}
      nextClassName={'text-[#939393]'}
      nextLabel={
        <svg enableBackground="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="electrolyte-svg-icon icon-arrow-right">
          <g>
            <path d="m2.5 0c-.1 0-.2 0-.3.1-.2.2-.2.5-.1.7l4.6 5.5-4.6 5.5c-.2.2-.2.5-.1.7s.5.2.7-.1l6-5c.1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.1-.1-.2-.1-.4-.1z"></path>
          </g>
        </svg>
      }
    />
  );
}
export default memo(Pagination);
