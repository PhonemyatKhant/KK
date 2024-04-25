import React from "react";
import {
  FaSalesforce,
  FaShoppingBag,
  FaStar,
  FaStarOfLife,
  FaTag,
  FaTruck,
} from "react-icons/fa";

const Banner = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-center items-center pt-5 mb-6">
      <div className=" p-4 flex flex-col justify-center items-center  ">
        <FaTruck className=" text-center text-4xl " />
        <h1 className=" sm:text-lg text-sm font-semibold">Reliable Shipping</h1>
      </div>
      <div className=" p-4 flex flex-col justify-center items-center ">
        <FaTag className=" text-center text-4xl" />
        <h1 className=" sm:text-lg text-sm font-semibold">Discounts</h1>
      </div>
      <div className=" p-4 flex flex-col justify-center items-center ">
        <FaStar className=" text-center text-4xl" />
        <h1 className=" sm:text-lg text-sm font-semibold">Quality Fabrics</h1>
      </div>
      <div className=" p-4 flex flex-col justify-center items-center ">
        <FaShoppingBag className=" text-center text-4xl" />
        <h1 className=" sm:text-lg text-sm font-semibold">New Arrivals</h1>
      </div>
    </div>
  );
};

export default Banner;
