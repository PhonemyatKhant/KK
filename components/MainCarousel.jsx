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
import { images } from "@/utils/images";
import Image from "next/image";
import { Button } from "./ui/button";

const MainCarousel = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      className="mySwiper h-[600px] w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide className=" relative" key={index}>
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={image}
              alt={index}
              className="w-full h-full object-cover block "
            />{" "}
          </div>
          <div className="absolute top-1/2  -left-3/4 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="outline">
              About Us
            </Button>
            <Button size="lg" variant="outline">
              View Collections
            </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainCarousel;
