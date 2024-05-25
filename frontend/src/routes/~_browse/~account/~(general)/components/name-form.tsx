import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { NameData, nameSchema } from "../schemas";
import { useUpdateName } from "../services";

type NameFormProps = NameData;

export const NameForm = ({ firstName, lastName }: NameFormProps) => {
  const { mutateAsync, isPending } = useUpdateName();

  const queryClient = useQueryClient();
  const form = useForm<NameData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  async function onSubmit(values: NameData) {
    await mutateAsync(values);
    await queryClient.invalidateQueries({
      queryKey: ["account-data", "general"],
    });
  }

  return (
    <Card>
      <Form {...form}>
        <CardHeader className="grid grid-cols-2 items-center gap-4 space-y-0">
          <FormField
            control={form.control}
            name="firstName"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-semibold">
                  <CardTitle>First Name</CardTitle>
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={() => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-semibold">
                  <CardTitle>Last Name</CardTitle>
                </FormLabel>
              </FormItem>
            )}
          />
        </CardHeader>
        <CardContent>
          <form
            className="grid grid-cols-2 items-start gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <LoadingButton
            loading={isPending}
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Save
          </LoadingButton>
        </CardFooter>
      </Form>
    </Card>
  );
};

export const NameFormSkeleton = () => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-2 items-center gap-4 space-y-0">
        <CardTitle>First Name</CardTitle>
        <CardTitle>Last Name</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 items-start gap-4">
          <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
          <div className="h-8 w-full animate-pulse rounded bg-secondary"></div>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="h-[36px] w-16 animate-pulse rounded bg-secondary"></div>
      </CardFooter>
    </Card>
  );
};
