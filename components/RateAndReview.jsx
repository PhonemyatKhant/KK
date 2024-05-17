"use client";

import { Pencil1Icon } from "@radix-ui/react-icons";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Label } from "./ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
const RateAndReview = ({ productId }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
    user: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();

    if (status !== "unauthenticated") {
      try {
        const response = await fetch(`/api/products/${productId}/review`, {
          method: "PATCH",
          body: JSON.stringify({
            review,
          }),
        });

        if (response.ok) {
          router.refresh();
        }
        if (response.status === 400) {
          toast({
            title: "Product Already Reviewed",
            action: (
              <ToastAction altText="undo">OK</ToastAction>
            ),
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setReview({
          name: "",
          rating: 0,
          comment: "",
          user: "",
        });
      }
    }
  };

  return (
    <div className=" w-full max-w-[500px] ">
      <Alert className="mb-5">
        <Pencil1Icon className="h-4 w-4" />
        <AlertTitle>Write a customer review!</AlertTitle>
      </Alert>
      <form onSubmit={submitHandler} className="space-y-4">
        <Select
          onValueChange={(value) =>
            setReview((prevValues) => ({
              ...prevValues,
              rating: Number(value),
            }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              <SelectItem value="1">1 - Poor</SelectItem>
              <SelectItem value="2">2 - Fair</SelectItem>
              <SelectItem value="3">3 - Good</SelectItem>
              <SelectItem value="4">4 - Very Good</SelectItem>
              <SelectItem value="5">5 - Excellent</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="review">Write review.</Label>
          <Textarea
            required
            placeholder="Type your review message here."
            id="review"
            onChange={(e) => {
              if (status !== "unauthenticated") {
                setReview((prevReview) => ({
                  ...prevReview,
                  comment: e.target.value,
                  name: session.user.name,
                  user: session.user.id,
                }));
              }
            }}
            value={review.comment}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default RateAndReview;
