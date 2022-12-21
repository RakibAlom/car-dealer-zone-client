import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css'
import "swiper/css/pagination";
import "./Banner.css";


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
          <img className="w-full" src="https://raw.githubusercontent.com/RakibAlom/car-dealer-zone-client/main/src/assets/images/banner-1.webp" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src="https://raw.githubusercontent.com/RakibAlom/car-dealer-zone-client/main/src/assets/images/banner-2.webp" alt="" />
        </SwiperSlide>

        <SwiperSlide>
          <img className="w-full" src="https://raw.githubusercontent.com/RakibAlom/car-dealer-zone-client/main/src/assets/images/banner-3.webp" alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;


