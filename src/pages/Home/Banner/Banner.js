import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";

const Banner = () => {
  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="w-full" src="https://api.valogari.com/api/upload/images/microsoftteams-image-16--d1057.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://api.valogari.com/api/upload/images/banner-2-ab93.webp" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://api.valogari.com/api/upload/images/banner-3-de15.webp" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://api.valogari.com/api/upload/images/banner-7-574d.webp" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;


