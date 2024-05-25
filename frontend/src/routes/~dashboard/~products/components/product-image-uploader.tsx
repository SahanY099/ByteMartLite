import { Upload } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import placeholder from "@/assets/placeholder.svg";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { ProductManagementData } from "../schemas";

const ImagePlaceholder = ({ main = false }: { main?: boolean }) => {
  if (main) {
    return (
      <div className="aspect-square h-full w-full rounded-md border border-dashed object-cover sm:w-1/2"></div>
    );
  }
  return <div className="rounded-md border border-dashed"></div>;
};

export const ProductImageUploaderToBeWorked = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<(File | string)[]>(
    Array(5).fill("") as [File | string],
  );

  const form = useFormContext<ProductManagementData>();

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Upload up to 5 images.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 sm:flex-row">
          <img
            alt="Product image"
            className="aspect-square h-full w-full rounded-md object-cover sm:w-1/2"
            height="200"
            src={placeholder}
            width="200"
          />
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 sm:w-1/2">
            <ImagePlaceholder />
            <ImagePlaceholder />
            <ImagePlaceholder />

            <FormLabel
              htmlFor="image"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "flex aspect-square h-full w-full border-separate items-center justify-center rounded-md border border-dashed",
              )}
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </FormLabel>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <>
                  <FormControl>
                    <input
                      type="file"
                      className="hidden"
                      id="image"
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        field.onChange(files);
                        if (e.target.files) {
                          setImages((prev) => [...prev, ...files]);
                        }
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                </>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProductImageUploader = () => {
  const form = useFormContext<ProductManagementData>();
  const imageRef = form.register("images");

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Upload up to 5 images.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...imageRef}
                    multiple
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      form.trigger("images");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </CardContent>
    </Card>
  );
};
