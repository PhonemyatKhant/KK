import React from "react";
import { FaSalesforce, FaShoppingBag, FaStar, FaStarOfLife, FaTag, FaTruck } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="  justify-around items-center  w-full flex flex-wrap ">
      <div className=" p-6 flex flex-col justify-center items-center  ">
        <FaTruck className=" text-center text-4xl " />
        <h1 className=" text-lg font-semibold">Reliable Shipping</h1>
      </div>
      <div className=" p-6 flex flex-col justify-center items-center ">
        <FaTag className=" text-center text-4xl" />
        <h1 className=" text-lg font-semibold">Discounts</h1>
      </div>
      <div className=" p-6 flex flex-col justify-center items-center ">
        <FaStar className=" text-center text-4xl" />
        <h1 className=" text-lg font-semibold">Quality Fabrics</h1>
      </div>
      <div className=" p-6 flex flex-col justify-center items-center ">
        <FaShoppingBag className=" text-center text-4xl" />
        <h1 className=" text-lg font-semibold">New Arrivals</h1>
      </div>
    </div>
  );
};

export default Banner;
