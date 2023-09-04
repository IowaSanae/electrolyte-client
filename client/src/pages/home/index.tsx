//? LIBRARY
import './style/index.css';
import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
//? APPS
import { useGetProductsQuery } from '../../services/post/index.hook';
import { useGetCategoryTreeQuery } from '../../services/category/index.hook';
import { useGetBannerQuery } from '../../services/banner/index.hook';
import { Carousel, Category, ProductList } from '../../containers';

function Home() {
  const payload = {
    limit: 96,
    page: 1,
  };
  const { data: dataProduct, isLoading: isLoadingDataProduct } = useGetProductsQuery(payload);
  const { data: dataCategory, isLoading: isLoadingCategory } = useGetCategoryTreeQuery();
  const { data: dataBanner, isLoading: isLoadingBanner } = useGetBannerQuery();
  const [filterDay, setFilterDay] = useState(1);
  const [filterMonth, setFilterMonth] = useState(12);


  const settingsBanner = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsCategory = {
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="bg-[#f5f5f5] overflow-hidden">
        <div className="grid wide">
          <div className="row sm-gutter">
            <Carousel data={dataBanner?.response || []} loading={isLoadingBanner} settings={settingsBanner} />
            <Category data={dataCategory?.response || []} loading={isLoadingCategory} settings={settingsCategory} />

            <div className="col l-12 mo-12 c-12">
              <div className=" text-[#1ba8ff]" style={{ fontWeight: "bold", margin: "20px 0 10px 0", fontSize: "20px" }}>Sản phẩm</div>
              <ProductList items={dataProduct?.response?.rows || []} col={'col l-2 mo-4 c-6'} loading={isLoadingDataProduct} />
              <div className="w-full text-center my-[1.25rem]">
                <NavLink
                  className="btn btn-light btn--m btn--inline btn-light--link _23OYGN hover:bg-[rgba(0,0,0,.02)] leading-[34px]"
                  style={{ width: '15em', margin: '0 auto', boxShadow: '0 1px 1px 0 rgb(0 0 0 / 9%)' }}
                  to="/daily_discover"
                >
                  Xem thêm
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default memo(Home);
