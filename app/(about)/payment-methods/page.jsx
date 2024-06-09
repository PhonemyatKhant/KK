import { Separator } from "@/components/ui/separator";
import React from "react";

const PaymentMethodPage = () => {
  return (
    <div className=" text-center">
      <h1 className=" text-3xl mb-2">Payment Methods</h1>
      <p className=" mb-6">
        Please add KKFabrcs in the note when you make a transaction. Please send
        the screenshot of the transaction to KK Fabrics`&apos;`s website.{" "}
      </p>

      <h1 className=" font-semibold">KBZ Bank</h1>
      <p>
        Acc Name: Phone Myat Khant <br></br> KBZ BANK : 09763092928
      </p>
      <Separator className=" my-4" />

      <h1 className=" font-semibold">KBZ Pay</h1>
      <p>
        Acc Name: Phone Myat Khant <br></br> KBZ Pay: 09763092928
      </p>
      <Separator  className=" my-4"/>

      <h1 className=" font-semibold">Wave Pay</h1>
      <p>
        Acc Name: Phone Myat Khant <br></br> Wave Pay: 09763092928
      </p>
      <Separator className=" my-4" />
    </div>
  );
};

export default PaymentMethodPage;
