"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import Form from "@/components/ProductForm";
import CreateProductForm from "@/components/CreateProductForm";

const CreateProductPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0,
    isFeaturedProduct: false,
    discountPercentage: 0,
    isOnSale:false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify({
          // userId: session?.user.id,
          name: formData.name,
          image: formData.image,
          brand: formData.brand,
          category: formData.category,
          description: formData.description,
          price: formData.price,
          discountPercentage: formData.discountPercentage,

          countInStock: formData.countInStock,
          isFeaturedProduct: formData.isFeaturedProduct,
          isOnSale: formData.discountPercentage !== 0 ? true : false,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
    // <CreateProductForm
    //   type="Create"
    //   formData={formData}
    //   setFormData={setFormData}
    //   submitting={submitting}
    //   handleSubmit={handleSubmit}
    // />
  );
};

export default CreateProductPage;
