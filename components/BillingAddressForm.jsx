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
import { Label, Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "./ui/input";
import NormalInputField from "./NormalInputField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BillingAddressForm = ({
  formData,
  setFormData,
  submitting,
  handleSubmit,
}) => {
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "screenshot") {
      setFileToBase(e.target.files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: id !== "sdf" ? value : checked,
      }));
    }
    // console.log(formData);
  };
  const setFileToBase = (file) => {
    // console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        screenshot: reader.result,
      }));
    };
  };

  return (
    <>
      <div className="max-w-[500px]">
        <div className="max-w-4xl py-8 pt-3">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <NormalInputField
                type="text"
                label="First Name"
                id="firstName"
                placeholder="First Name"
                required={true}
                onChange={handleChange}
                value={formData.firstName}
              />
              <NormalInputField
                type="text"
                label="Last Name"
                id="lastName"
                placeholder="Last Name"
                required={true}
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <NormalInputField
              type="text"
              label="City"
              id="city"
              placeholder="City"
              required={true}
              onChange={handleChange}
              value={formData.city}
            />
            <NormalInputField
              type="text"
              label="Address"
              id="address"
              placeholder="Address"
              required={true}
              onChange={handleChange}
              value={formData.address}
            />
            <NormalInputField
              type="text"
              label="Apartment"
              id="apartment"
              placeholder="Apartment, suite, etc."
              required={true}
              onChange={handleChange}
              value={formData.apartment}
            />
            <NormalInputField
              type="text"
              label="Postal Code"
              id="postalCode"
              placeholder="Postal Code"
              required={true}
              onChange={handleChange}
              value={formData.postalCode}
            />
            <NormalInputField
              type="text"
              label="Phone"
              id="phone"
              placeholder="Phone"
              required={true}
              onChange={handleChange}
              value={formData.phone}
            />
            <Separator className="h-0.5 w-full bg-slate-400 mt-4" />
            <h1 className=" text-2xl font-semibold my-3">Payment Screenshot</h1>
            <Select
              onValueChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  paymentMethod: value,
                }));
              }}
            >
              <SelectTrigger className=" w-1/2">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Method</SelectLabel>
                  <SelectItem value="KBZ BANK">KBZ BANK</SelectItem>
                  <SelectItem value="KBZ PAY">KBZ PAY</SelectItem>
                  <SelectItem value="WAVE PAY">WAVE PAY</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <NormalInputField
              type="file"
              id="screenshot"
              required={true}
              onChange={handleChange}
            />
            <Button className="w-full" type="submit">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BillingAddressForm;
