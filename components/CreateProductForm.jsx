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
const CreateProductForm = ({
  type,
  formData,
  setFormData,
  submitting,
  handleSubmit,
}) => {
  const router = useRouter();
  let imageFile;
  const formSchema = z.object({
    name: z.string().trim().min(1, { message: "This field is required." }),
    price: z.coerce.number().positive(),
    image: z.string(),
    brand: z.string().trim().min(1, { message: "This field is required." }),
    countInStock: z.coerce.number().positive(),
    category: z.string().trim().min(1, { message: "This field is required." }),
    desc: z.string().trim().min(1, { message: "This field is required." }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      image: "",
      brand: "",
      category: "",
      desc: "",
      countInStock: 1,
    },
  });

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
    return reader.result;
  };

  async function onSubmit(values) {
    setFormData({ ...values, image: imageFile });

    console.log(formData, "testing");

    //POST
  }
  const handleFileChange = (e) => {
    console.log("executed");
    const { name, value } = e.target;
    if (name === "image") {
      setFileToBase(e.target.files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        name: value,
      }));
    }
    console.log(formData);
  };

  return (
    <>
      <div className="flex flex-start container mt-4">
        <Button variant={"secondary"} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div className="max-w-[500px]">
        <h2 className="text-2xl font-bold mb-4">{type} Product</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              label="Product Name"
              name="name"
              form={form}
              placeholder="Product Name"
              onChange={handleFileChange}
            />
            <InputField
              label="Price"
              name="price"
              form={form}
              placeholder="Price"
              type="number"
            />
            <InputField
              label="Image"
              name="image"
              form={form}
              placeholder="Image"
              type="file"
              onChange={handleFileChange}
            />
            <InputField
              label="Brand"
              name="brand"
              form={form}
              placeholder="Brand"
            />
            <InputField
              label="Count In Stock"
              name="countInStock"
              form={form}
              placeholder="Count In Stock"
              type="number"
            />
            <InputField
              label="Category"
              name="category"
              form={form}
              placeholder="Category"
            />
            <InputField
              label="Product Description"
              name="desc"
              form={form}
              placeholder="Product Description"
            />
            <Button type="submit" className="my-4 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateProductForm;
