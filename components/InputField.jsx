import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export function InputField({
  label,
  form,
  name,
  placeholder = "example",
  type = "text",
  onChange,
  
}) {
  return (
    <div className="relative mt-2 flex-1">
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              {!onChange ? (
                <Input
                  type={type ? type : "text"}
                  placeholder={placeholder}
                  {...field}
                />
              ) : (
                <Input
                  type={type ? type : "text"}
                  placeholder={placeholder}
                  {...field}
                  onChange={onChange}
                
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
