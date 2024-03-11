"use client";
import React, { useState } from "react";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useRouter } from "next/navigation";
import { InputField } from "./InputField";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BillingAddressForm = () => {
  const router = useRouter();

  const formSchema = z.object({
    firstName: z.string().trim().min(1, { message: "This field is required." }),
    lastName: z.string().trim().min(1, { message: "This field is required." }),
    address: z.string().trim().min(1, { message: "This field is required." }),
    apartment: z.string().trim().min(1, { message: "This field is required." }),
    postalCode: z.coerce
      .number()
      .lte(999999, { message: "Please type in the actual postal code." })
      .positive(),
    phone: z.coerce
      .number()
      .lte(999999999999, { message: "Please type in the actual phone number." })
      .positive(),
    screenshot: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      screenshot: "",
      postalCode: 111111,
      phone: 959,
    },
  });

  async function handleSubmit(values) {
    console.log(values, "testing");

    //POST
  }
  return (
    <>
      <div className="max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex justify-between items-center gap-1 ">
              <InputField
                label="First Name"
                name="firstName"
                form={form}
                placeholder="First Name"
              />
              <InputField
                label="Last Name"
                name="lastName"
                form={form}
                placeholder="Last Name"
              />
            </div>
            <InputField
              label="Address"
              name="address"
              form={form}
              placeholder="Address"
            />
            <InputField
              label="Apartment"
              name="apartment"
              form={form}
              placeholder="Apartment, suite, etc."
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              form={form}
              placeholder="Postal Code"
              type="number"
            />
            <InputField
              label="Phone"
              name="phone"
              form={form}
              placeholder="Phone"
              type="number"
            />
            <Separator className="w-full  h-0.5 bg-neutral-400     my-4" />
            <h1 className=" text-2xl font-semibold my-3">Payment Screenshot</h1>
            <InputField
              name="screenshot"
              form={form}
              placeholder="Payment Screenshot"
              type="file"
            />
            <Button type="submit" className="my-4 w-full">
              Place Order
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default BillingAddressForm;
