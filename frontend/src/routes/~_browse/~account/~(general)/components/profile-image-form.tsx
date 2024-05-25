import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, UploadIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { ImageData, imageSchema } from "../schemas";
import { useUpdateImage } from "../services";

type ProfileImageFormProps = {
  image: string;
};

export function ProfileImageForm({ image }: ProfileImageFormProps) {
  const { mutateAsync, isPending } = useUpdateImage();
  const [selectedImage, setSelectedImage] = useState<File | null | string>(
    null,
  );

  const queryClient = useQueryClient();
  const form = useForm<ImageData>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      image: image ?? "",
    },
    mode: "onChange",
  });

  const getAvatarUrl = () => {
    if (
      selectedImage &&
      typeof selectedImage !== "string" &&
      form.formState.isValid
    )
      return URL.createObjectURL(selectedImage);
    return image;
  };

  async function handleChange(values: { image?: FileList }) {
    console.log(values);
    if (values.image && !isPending) {
      await mutateAsync(values.image?.[0]);
      await queryClient.invalidateQueries({
        queryKey: ["account-data", "general"],
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(handleChange)}
        className="flex w-fit flex-col items-center gap-4 sm:items-start"
      >
        <div className="relative h-28 w-28">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormLabel htmlFor="image" className="group">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={getAvatarUrl()} />
                  <AvatarFallback>BU</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-1 right-1 z-20 rounded-full bg-foreground p-1 text-primary-foreground transition group-hover:opacity-50">
                  <Pencil className="h-4 w-4" />
                </div>
                <div className="group absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full bg-primary-foreground opacity-0 transition hover:opacity-80">
                  <UploadIcon />
                </div>
              </FormLabel>
            )}
          />
          <FormField
            control={form.control}
            name="image"
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
                      field.onChange(e.target.files);
                      setSelectedImage(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                </FormControl>
              </>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="flex flex-col items-center space-y-0 sm:items-start">
              <FormLabel className="text-base font-semibold">
                <CardTitle>Profile Image</CardTitle>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export function ProfileImageFormSkeleton() {
  return (
    <div className="relative h-28 w-28">
      <div className="h-28 w-28 animate-pulse rounded-full bg-secondary"></div>
      <div className="absolute bottom-1 right-1 animate-pulse rounded-full bg-secondary p-1">
        <div className="h-4 w-4"></div>
      </div>
    </div>
  );
}
