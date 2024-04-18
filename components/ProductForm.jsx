"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { InputField } from "./InputField";

const Form = ({ type, formData, setFormData, submitting, handleSubmit }) => {
  const router = useRouter();
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "image") {
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
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result,
      }));
    };
  };
  return (
    <>
      <div className="flex flex-start container mt-4">
        <Button variant={"secondary"} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div className="container max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">{type} Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          {/* discounts */}
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="discountPercentage">Put on sale?</Label>
            <Input
              type="number"
              id="discountPercentage"
              placeholder="Discount Percentage %"
              value={formData.discountPercentage}
              onChange={handleChange}
            />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" onChange={handleChange} />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="brand">Brand</Label>
            <Input
              type="text"
              id="brand"
              placeholder="Product Brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="countInStock">Count In Stock</Label>
            <Input
              type="number"
              id="countInStock"
              placeholder="Count In Stock"
              value={formData.countInStock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid w-full max-w-lg items-center gap-1.5">
            <Label htmlFor="category">Category</Label>
            <Input
              type="text"
              id="category"
              placeholder="Product category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid w-full max-w-lg gap-1.5">
            <Label htmlFor="description">Product Descriptioin</Label>
            <Textarea
              placeholder="Add Product Description Here."
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default Form;
