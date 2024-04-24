"use client";

import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "./ui/label";
import { Toggle } from "@/components/ui/toggle";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleOOS,
  toggleBrand,
  toggleCategory,
} from "@/app/redux/slices/filterSlice";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Sidebar = ({
  brandOptions,
  categoryOptions,
  maxPrice,
  sidebarData,
  isLoading,
}) => {
  const [data, setData] = useState(sidebarData);
  const [value, setValue] = useState(maxPrice);
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { viewOutOfStock, brand, category } = useSelector(
    (state) => state.filter
  );

  const toggleOOSProducts = async (value) => {
    if (pathname.startsWith("/collections")) router.push("/search?query=");
    dispatch(toggleOOS(value));
  };
  //brand toggle
  const toggleBrandHandler = async (value) => {
    if (pathname.startsWith("/collections")) router.push("/search?query=");
    dispatch(toggleBrand(value));
  };
  const toggleCategoryHandler = async (value) => {
    if (pathname.startsWith("/collections")) router.push("/search?query=");
    dispatch(toggleCategory(value));
  };

  return (
    <aside className=" w-4/12 bg-white h-screen">
      <div className=" p-3 overflow-y-auto rounded h-full flex flex-col">
        <ul className="flex items-center justify-between p-4">
          <span>Out of Stock</span>{" "}
          <Switch
            checked={viewOutOfStock}
            onCheckedChange={(value) => toggleOOSProducts(value)}
          />
        </ul>
        <Separator />
        <ul className="flex flex-col p-4">
          <span>Brand</span>

          <ToggleGroup
            defaultValue={brand}
            onValueChange={(value) => {
              toggleBrandHandler(value);
            }}
            className="flex flex-wrap"
            type="single"
            size="sm"
          >
            {brandOptions.map((option, index) => (
              <ToggleGroupItem
                variant="outline"
                key={index}
                value={option}
                aria-label={option}
              >
                {option}{" "}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ul>
        <Separator />
        {/* category toggle group */}
        <ul className="flex flex-col p-4">
          <span>Category</span>
          <ToggleGroup
            defaultValue={category}
            onValueChange={(value) => {
              toggleCategoryHandler(value);
            }}
            className="flex flex-wrap"
            type="single"
            size="sm"
          >
            {categoryOptions.map((option, index) => (
              <ToggleGroupItem
                variant="outline"
                key={index}
                value={option}
                aria-label={option}
              >
                {option}{" "}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </ul>
        <Separator />

        <ul className="flex flex-col p-4">
          <div className="flex flex-wrap gap-1 mt-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxlength">
                  {" "}
                  <span>Maximum Price</span>
                </Label>
                <span className="w-auto rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                  {value}
                  <span> K</span>
                </span>
              </div>
              <Slider
                id="maxlength"
                onValueChange={setValue}
                defaultValue={[maxPrice]}
                max={maxPrice}
                step={500}
              />
            </div>
          </div>
        </ul>
        <Separator />
      </div>
    </aside>
  );
};

export default Sidebar;
