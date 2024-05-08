import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "@/components/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { SignupSchema } from "@/schemas/auth";
import { useSignup } from "@/services/auth";
import { SignupData } from "@/types/auth";

export const SignupForm = () => {
  const { mutateAsync, isPending, status } = useSignup();
  const navigate = useNavigate({ from: "/signup" });

  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    switch (status) {
      case "success":
        toast.success("Account created successfully!");
        navigate({ to: "../" });
        break;
      case "error":
        toast.error("Something went wrong.");
        break;
      default:
        break;
    }
  }, [status, navigate]);

  const onSubmit = async (data: SignupData) => {
    await mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[250] space-y-8 md:w-[350px]"
      >
        <div className="space-y-4">
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
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
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter 6 characters or more"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retype password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Retype your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <LoadingButton className="w-full" loading={isPending}>
          Sign Up
        </LoadingButton>
      </form>
    </Form>
  );
};
