import React from "react";
import { Separator } from "@/components/ui/separator";
const OrderHeader = ({ title, value }) => {
  return (
    <>
      <p className="text-sm text-muted-foreground">{`${title}:`}</p>
      {value && <h4 className=" text-sm font-medium leading-none">{value}</h4>}
      <Separator orientation="vertical" />
    </>
  );
};

export default OrderHeader;
