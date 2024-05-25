"use client";
import OrderHeader from "@/components/OrderHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const OrderDetailsPage = ({ params }) => {
  const { orderId, userId } = params;
  const [order, setOrder] = useState();
  const router = useRouter();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
        const res = await fetch(`${apiEndpoint}/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }
        const orderData = await res.json();
        setOrder(orderData);
      } catch (error) {
        console.error(error);
        // Handle error redirect
      }
    };
    getOrder();
  }, [orderId]);

  if (order) {
    return (
      <div className=" my-7 ">
        <p className="text-sm text-muted-foreground mb-3">
          Thank you. Your order has been received. The items will be shipped
          using Royal Express delivery service to your address.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <OrderHeader title="DATE" value={order.createdAt.slice(0, 10)} />
          <OrderHeader
            title="NAME"
            value={order.firstName + " " + order.lastName}
          />
          <OrderHeader title="PHONE" value={order.phone} />
          <OrderHeader title="TOTAL" value={`${order.totalPrice} K`} />
          <OrderHeader title="USER ID" value={userId} />
        </div>
        <div>
          <h1 className=" text-3xl font-semibold my-6 mt-9">Order Details</h1>
          <div className="max-w-[720px] w-full">
            <div className="flex justify-between items-center rounded-sm p-6  ">
              <h4 className=" text-lg font-medium leading-none">Product</h4>
              <h4 className=" text-lg font-medium leading-none">Total</h4>
            </div>
            <Separator />
            {order.orderItems.map((orderItem) => (
              <div key={orderItem._id}>
                {" "}
                <div className="flex justify-between items-center rounded-sm p-6  ">
                  <p className="text-sm ">
                    {orderItem.name} x {orderItem.qty}{" "}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {orderItem.price} K{" "}
                  </p>
                </div>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
              <p className="text-sm ">Items Price</p>
              <p className="text-sm text-muted-foreground">
                {order.itemsPrice} K{" "}
              </p>
            </div>
            <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
              <p className="text-sm ">Tax Price</p>
              <p className="text-sm text-muted-foreground">
                {order.taxPrice} K{" "}
              </p>
            </div>
            <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
              <p className="text-sm ">Shipping Price</p>
              <p className="text-sm text-muted-foreground">
                {order.shippingPrice} K{" "}
              </p>
            </div>
            <Separator />
            <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
              <p className="text-sm ">Total</p>
              <p className="text-sm text-muted-foreground">
                {order.totalPrice} K{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-[720px] w-full">
          <h1 className=" text-3xl font-semibold my-6">Billing Address</h1>
          <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
            <p className="text-sm ">City</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}
            </p>
          </div>
          <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
            <p className="text-sm ">Address</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.address}
            </p>
          </div>
          <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
            <p className="text-sm ">Apartment</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.apartment}
            </p>
          </div>
          <div className="flex justify-between items-center rounded-sm p-6 py-2  ">
            <p className="text-sm ">Postal Code</p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.postalCode}
            </p>
          </div>
        </div>
        <div className="max-w-[720px] w-full">
          <h1 className=" text-3xl font-semibold my-6">Payment Details</h1>
          <p className="text-sm text-muted-foreground">
            {" "}
            Method : {order.paymentMethod}{" "}
          </p>
          <div className=" my-8 h-[500px] w-full  max-w-[300px]">
            <Image
              className="object-fill h-full w-full rounded-lg shadow-md"
              src={order?.screenshot}
              alt={order?.paymentMethod}
              width={64}
              height={64}
            />
          </div>
        </div>
        <div className="flex my-9 justify-normal items-center space-x-4 text-sm flex-wrap gap-2">
          <OrderHeader title="ORDER ID" value={orderId} />
          <OrderHeader
            title="PAYMENT STATUS"
            value={order.isPaid ? "PAID" : "NOT PAID"}
          />
          <OrderHeader
            title="DELIVERY STATUS"
            value={order.isDelivered ? "DELIVERED" : "NOT DELIVERED"}
          />
        </div>
        <div className="flex flex-start  mt-2 mb-5">
          <Button onClick={() => router.back()}>Back To Orders</Button>
        </div>
      </div>
    );
  }
};

export default OrderDetailsPage;
