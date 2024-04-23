"use client";

import React, { useState } from "react";
import { Separator } from "./ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "./ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "./ui/label";
import { Toggle } from "@/components/ui/toggle";

const Sidebar = ({
  brandOptions,
  categoryOptions,
  maxPrice,
  sidebarData,
  isLoading,
  filterQuery
}) => {
  const [data, setData] = useState(sidebarData);
  const [value, setValue] = useState(maxPrice);

  return (
    <aside className=" w-4/12 bg-white h-screen">
      <div className=" p-3 overflow-y-auto rounded h-full flex flex-col">
        <ul className="flex items-center justify-between p-4">
          <span>Out of Stock</span> <Switch />
        </ul>
        <Separator />
        <ul className="flex flex-col p-4">
          <span>Brand</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {brandOptions.map((option, index) => (
              <Toggle
                key={index}
                aria-label="Toggle 2"
                variant="outline"
                size="sm"
              >
                {option}
              </Toggle>
            ))}
          </div>
        </ul>
        <Separator />
        <ul className="flex flex-col p-4">
          <span>Category</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {categoryOptions.map((option, index) => (
              <Toggle
                key={index}
                aria-label="Toggle 2"
                variant="outline"
                size="sm"
              >
                {option}
              </Toggle>
            ))}
          </div>
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
