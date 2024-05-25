"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "@/app/globals.css";

// import required modules
import { Navigation } from "swiper/modules";
import image1 from "@/public/assets/fabricspic1.jpg";
import image2 from "@/public/assets/fabricspic2.jpg";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const MainCarousel = () => {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper h-[600px] max-sm:h-[400px] w-full"
      >
        <SwiperSlide className=" relative">
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={image1}
              alt="fabric1"
              className="w-full h-full object-cover block "
            />{" "}
          </div>
          <div className="absolute inset-x-0 bottom-36 flex items-center justify-center">
            <div className="flex flex-wrap gap-4">
              <Link href="/collections">
                {" "}
                <Button variant="outline">SHOP NOW</Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide className=" relative">
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={image2}
              alt="fabric2"
              className="w-full h-full object-cover block "
            />{" "}
          </div>
          <div className="absolute inset-x-0 bottom-36 flex items-center justify-center">
            <div className="flex flex-wrap gap-4">
              <Link href="/about-us">
                {" "}
                <Button variant="outline">ABOUT US</Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default MainCarousel;
