import OrderHeader from "@/components/OrderHeader";

const OrderDetailsPage = ({ params }) => {
 
  const {orderId,userId} = params
  return (
    <div className="container my-8 ">
      <div className="flex h-5 items-center space-x-4 text-sm">
        <OrderHeader title="DATE" value="20/7/2000" />
        <OrderHeader title="EMAIL" value="phonemyatkhant45@gmail.com" />
        <OrderHeader title="PHONE" value="09763092928" />
        <OrderHeader title="TOTAL" value="20000 K" />
        <OrderHeader title="USER ID" value={userId} />
      </div>
      <div>
        <h1 className=" text-3xl font-semibold my-6">Order Details</h1>
      </div>
      <div>
        <h1 className=" text-3xl font-semibold my-6">Billing Address</h1>
      </div>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <OrderHeader title="ORDER ID" value={orderId} />
        <OrderHeader title="PAYMENT STATUS" value="PAID" />
        <OrderHeader title="DELIVERY STATUS" value="DELIVERED" />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
