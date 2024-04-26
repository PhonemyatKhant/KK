"use client";

import BillingAddressForm from "@/components/BillingAddressForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaSadCry } from "react-icons/fa";

const CheckOutPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    useSelector((state) => state.cart);

  const orderItems = cartItems.map((cartItem) => ({
    name: cartItem.name,
    qty: cartItem.quantity,
    price: cartItem.price,
    product: cartItem._id,
  }));
  // console.log(cartItems);

  const [submitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    apartment: "",
    postalCode: 111111,
    phone: 959,
    screenshot: "",
  });
  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders/new", {
        method: "POST",
        body: JSON.stringify({
          user: session?.user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          orderItems: orderItems,
          shippingAddress: {
            address: formData.address,
            apartment: formData.apartment,
            postalCode: formData.postalCode,
            city: formData.city,
          },
          paymentMethod: formData.paymentMethod,
          screenshot: formData.screenshot,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
          // isPaid,
          isDelivered: false,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (cartItems.length === 0)
    return (
      <Alert variant='destructive' >
        <FaSadCry />
        <AlertTitle>Add Items To The Cart To Check Out!</AlertTitle>
        <AlertDescription>
          You can add items to your cart using the add to cart button.
        </AlertDescription>
      </Alert>
    );
  return (
    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
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
        <BillingAddressForm
          formData={formData}
          setFormData={setFormData}
          submitting={submitting}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className=" col-span-3">
        <div className="flex flex-col">
          {cartItems.map(
            ({ _id, image, name, price, quantity, discountPercentage }) => {
              return (
                <div
                  className=" mt-4 flex items-center justify-between"
                  key={_id}
                >
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
                  <p className=" text-left pt-2 text-sm">{name}</p>
                  <p className=" pt-2 text-sm">
                    {`${
                      ((100 - discountPercentage) / 100) * price
                    } x ${quantity} = ${
                      ((100 - discountPercentage) / 100) * price * quantity
                    }`}{" "}
                    K{" "}
                  </p>
                </div>
              );
            }
          )}
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
