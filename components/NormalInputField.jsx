import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const NormalInputField = ({
  type,
  label,
  id,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label className="text-sm font-semibold" htmlFor={id}>
        {label}
      </Label>
      {required ? (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default NormalInputField;
