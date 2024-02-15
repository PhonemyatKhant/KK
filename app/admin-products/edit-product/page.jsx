"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/ProductForm";

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: 0,
    countInStock: 0,
    isFeaturedProduct: false,
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      setFormData({
        name: data.name,
        image: data.image,
        brand: data.brand,
        category: data.category,
        description: data.description,
        price: data.price,
        countInStock: data.countInStock,
        isFeaturedProduct: false,
      });
    };

    if (productId) getProductDetails();
  }, [productId]);

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!productId) return alert("Missing ProductId!");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          brand: formData.brand,
          category: formData.category,
          description: formData.description,
          price: formData.price,
          countInStock: formData.countInStock,
          isFeaturedProduct: formData.isFeaturedProduct,
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
      type="Edit"
      formData={formData}
      setFormData={setFormData}
      submitting={submitting}
      handleSubmit={updateProduct}
    />
  );
};

export default UpdateProduct;
