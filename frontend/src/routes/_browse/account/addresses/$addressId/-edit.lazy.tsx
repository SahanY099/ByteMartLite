import { addressQueryOptions, useUpdateAddress } from "@/services/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormLayout } from "../-components/form-layout";

import { AddressSchema } from "@/schemas/account";
import { useGetCities, useGetProvinces } from "@/services/account";
import { AddressData } from "@/types/account";

export const Route = createLazyFileRoute(
  "/_browse/account/addresses/$addressId/edit/lazy copy",
)({
  component: EditAddress,
});

function EditAddress() {
  const { addressId } = Route.useParams();
  const { data } = useSuspenseQuery(addressQueryOptions(addressId));

  const [provinceId, setProvinceId] = useState<number | null>(data.province.id);

  const { mutateAsync, isPending, status } = useUpdateAddress(data.id);
  const { data: provinces } = useGetProvinces();
  const { data: cities } = useGetCities(provinceId);

  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/account/addresses/new" });
  const form = useForm<AddressData>({
    resolver: zodResolver(AddressSchema),
    mode: "onSubmit",
    defaultValues: {
      ...data,
      unit: data.unit || "",
      city: data.city.id,
    },
  });

  const handleProvinceChange = (province: string) => {
    setProvinceId(parseInt(province));
    form.resetField("city");
  };

  const onSubmit = async (data: AddressData) => {
    await mutateAsync(data);
    await queryClient.invalidateQueries({
      queryKey: ["account-data", "addresses"],
    });
  };

  useEffect(() => {
    if (status == "success") navigate({ to: "/account/addresses" });
  }, [status, navigate]);

  return (
    <FormLayout update name={data.name}>
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
                      <FormDescription>
                        The name of the address.
                      </FormDescription>
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
                        data.province.id != undefined
                          ? data.province.id.toString()
                          : ""
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
                            field.value != undefined
                              ? field.value.toString()
                              : ""
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
                Save
              </LoadingButton>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </FormLayout>
  );
}
