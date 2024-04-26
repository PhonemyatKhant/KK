import { Separator } from "@/components/ui/separator";
import React from "react";

const ContactUsPage = () => {
  return (
    <div className=" text-center">
      <h1 className=" text-3xl mb-2">Contact Us</h1>
      <p className=" mb-6">
        If you have any urgant cases regarding payment, shipping and delivery,
        please contact KK Fabrics' Facebook Messenger.{" "}
      </p>

      <h1 className=" font-semibold">Phone</h1>
      <p>+959763092928</p>
      <p>+959343543564</p>
      <Separator className=" my-4" />

      <h1 className=" font-semibold">Email</h1>
      <p className=" underline">phonemyatkhant45@gmail.com</p>
      <Separator className=" my-4" />

      <h1 className=" font-semibold">Store Address</h1>
      <p>Unit7, MinYe, Padauk St., Myin Mu, Sagaing City</p>
      <Separator className=" my-4" />
    </div>
  );
};

export default ContactUsPage;
