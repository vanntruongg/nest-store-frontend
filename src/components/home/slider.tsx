"use client";
import Image from "next/image";
import React from "react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ImgSlide1 from "../../assets/slide/slide-1.webp";
import ImgSlide2 from "../../assets/slide/slide-2.webp";
import ImgSlide3 from "../../assets/slide/slide-3.webp";
import Link from "next/link";
import { routes } from "~/static";

const Slider = () => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar]}
        // spaceBetween={50}
        slidesPerView={1}
        navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        preventClicks={false}
        preventClicksPropagation={false}
        scrollbar={true}
      >
        {/* {slides.map(({ id, image }) => (
          <SwiperSlide key={id} className="select-none">
            <Image src={image} alt={`slide-${id}`} sizes="50vw" />
          </SwiperSlide>
        ))} */}
        <SwiperSlide className="">
          <div className="flex justify-end relative">
            <div className="p-20 w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">In this season, fin the best</span>
                <p className="text-5xl">Exclusive collection for everyone</p>
              </div>
              <Link
                href={routes.SHOP}
                className="border border-black px-6 py-3 text-18 text-black font-bold font-nunito hover:shadow-md hover:bg-black hover:text-white transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
            <Image
              src={ImgSlide1}
              alt="slide1"
              className="h-auto w-[600px]"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <div className="flex justify-end relative">
            <div className="p-20 w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">In this season, fin the best</span>
                <p className="text-5xl">Exclusive collection for everyone</p>
              </div>
              <Link
                href={routes.SHOP}
                className="border border-black px-6 py-3 text-18 text-black font-bold font-nunito hover:shadow-md hover:bg-black hover:text-white transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
            <Image
              src={ImgSlide2}
              alt="slide2"
              className="w-[820px] h-auto"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="select-none">
          <div className="flex justify-end relative">
            <div className="p-20 w-1/2 flex flex-col justify-center gap-10 items-start absolute left-0 top-[40%] translate-y-[-50%]">
              <div className="">
                <span className="text-lg">In this season, fin the best</span>
                <p className="text-5xl">Exclusive collection for everyone</p>
              </div>
              <Link
                href={routes.SHOP}
                className="border border-black px-6 py-3 text-18 text-black font-bold font-nunito hover:shadow-md hover:bg-black hover:text-white transition-all duration-200"
              >
                Shop Now
              </Link>
            </div>
            <Image
              src={ImgSlide3}
              alt="slide-3"
              className="h-auto w-[608px]"
              loading="lazy"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
