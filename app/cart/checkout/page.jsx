"use client";

import BillingAddressForm from "@/components/BillingAddressForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useSelector } from "react-redux";

const CheckOutPage = () => {
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    useSelector((state) => state.cart);
  
  return (
    <div className=" container grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
      <div className=" col-span-4">
        <h1 className=" text-3xl font-semibold my-3">Payment</h1>
        <div className=" max-w-[500px] ">
          {" "}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Bank Deposit</AccordionTrigger>
              <AccordionContent>
                KBZ Bank - 09459224459 (account name - Phone Myat Khant)
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>KBZ Pay</AccordionTrigger>
              <AccordionContent>
                Acc Name: Phone Myat Khant <br></br> KBZ Pay: 09763092928
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Wave Pay</AccordionTrigger>
              <AccordionContent>
                Acc Name: Phone Myat Khant <br></br> Wave Pay: 09763092928
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <h1 className=" text-2xl font-semibold my-3">Billing Address</h1>
        <BillingAddressForm />
      </div>
      <div className=" col-span-3">
        <div className="flex flex-col">
          {cartItems.map(({ _id, image, name, price, quantity }) => {
            return (
              <div  className=" mt-4 flex items-center justify-between" key={_id}>
                <div className=" flex max-w-14 h-full">
                  <Image
                    style={{
                      width: "auto",
                      height: "5rem",
                      borderRadius: "10%",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                  />
                </div>
                <p className=" text-left pt-2 text-sm">{name} K </p>
                <p className=" pt-2 text-sm">
                  {`${price} x ${quantity} = ${price * quantity}`} K{" "}
                </p>
              </div>
            );
          })}
          <div className="mt-4 flex justify-between items-center">
            <p className=" text-left pt-2 text-lg font-semibold">Items Price</p>
            <p className=" text-left pt-2 text-lg font-semibold">
              {itemsPrice} K{" "}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" text-left pt-2 text-lg font-semibold">
              Shipping Price
            </p>
            <p className=" text-left pt-2 text-lg font-semibold">
              {shippingPrice} K{" "}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" text-left pt-2 text-lg font-semibold">Tax Price</p>
            <p className=" text-left pt-2 text-lg font-semibold">
              {taxPrice} K{" "}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className=" text-left pt-2 text-lg font-semibold">Total Price</p>
            <p className=" text-left pt-2 text-lg font-semibold">
              {totalPrice} K{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
