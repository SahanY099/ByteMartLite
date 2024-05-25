import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/loading-button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddressData, addressSchema } from "../schemas";
import { useGetCities, useGetProvinces } from "../services";
import { Address } from "../types";

type AddressFormProps = {
  isPending: boolean;
  onSubmit: (data: AddressData) => Promise<void> | void;
} & (UpdateProps | CreateProps);

type UpdateProps = {
  type: "update";
  addressId: string;
  initialData: Address;
};

type CreateProps = {
  type: "create";
  billing: boolean;
};

export const AddressForm = ({
  isPending,
  onSubmit,
  ...props
}: AddressFormProps) => {
  const [provinceId, setProvinceId] = useState<number | null>(
    props.type == "update" ? props.initialData.province.id : null,
  );

  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(provinceId);

  const form = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    mode: "onSubmit",
    defaultValues:
      props.type == "create"
        ? {
            name: "",
            street: "",
            unit: "",
            city: undefined,
            postalCode: "",
            isBilling: props.billing,
          }
        : {
            ...props.initialData,
            unit: props.initialData.unit || "",
            city: props.initialData.city.id,
          },
  });

  const handleProvinceChange = (province: string) => {
    setProvinceId(parseInt(province));
    form.resetField("city");
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} placeholder="Home, Office, etc." />
                    <FormDescription>The name of the address.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-rows-3 gap-6 sm:grid-cols-3 sm:grid-rows-1 sm:gap-3">
                {/* province */}
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      handleProvinceChange(e);
                    }}
                    defaultValue={
                      props.type == "update" &&
                      props.initialData.province.id != undefined
                        ? props.initialData.province.id.toString()
                        : undefined
                    }
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {provinces?.map((province) => (
                        <SelectItem
                          key={province.id}
                          value={province.id.toString()}
                        >
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>

                {/* city */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Select
                        disabled={!provinceId}
                        onValueChange={(e) => {
                          field.onChange(parseInt(e));
                        }}
                        defaultValue={
                          field.value != undefined ? field.value.toString() : ""
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities?.map((city) => (
                            <SelectItem
                              key={city.id}
                              value={city.id.toString()}
                            >
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* postal code */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <Input {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street</FormLabel>
                    <Input {...field} placeholder="Street address, P.O box" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field: { value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Unit (opt)</FormLabel>
                    <Input
                      {...rest}
                      value={value || ""}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <LoadingButton
              loading={isPending}
              className="w-full  sm:w-auto"
              type="submit"
            >
              {props.type == "update" ? "Update" : "Save"}
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export const AddressFormSkeleton = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
          </div>
          <div className="grid grid-rows-3 gap-6 sm:grid-cols-3 sm:grid-rows-1 sm:gap-3">
            <div className="space-y-2">
              <Label>Province</Label>
              <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
            </div>
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Street</Label>
            <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
          </div>
          <div className="space-y-2">
            <Label>Unit (opt)</Label>
            <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="h-[36px] w-full animate-pulse rounded bg-secondary sm:w-16"></div>
      </CardFooter>
    </Card>
  );
};
