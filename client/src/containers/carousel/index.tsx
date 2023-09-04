//? LIBRARY
import './carousel_pc.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { memo } from 'react';
import { Banner } from '../../types/banner';
//? APP

interface CarouselModel {
  data: Banner[];
  settings: any;
  loading: boolean;
}

function Carousel({ data, settings, loading }: CarouselModel) {
  return (
    <>
      {!loading && (
        <>
          <div className="pt-[150px]">
            <Slider {...settings}>
              {data?.map((listItem: Banner, index: number) => {
                return (
                  <div key={index}>
                    <img src={listItem?.image_url} alt="Slider"/>
                  </div>
                );
              })}
            </Slider>
          </div>
          {/* <div className="col l-4 m-0-4 c-4  pt-[150px]">
            <div>
              {data?.map((item: Banner, index: number) => {
                return (
                  index > data.length - 3 && (
                    <div className="mb-[5px]" key={index}>
                      <img src={item.image_url} alt="Carousel09" className="w-full h-[96%]" />
                    </div>
                  )
                );
              })}
            </div>
          </div> */}
        </>
      )}
    </>
  );
}

export default memo(Carousel);
