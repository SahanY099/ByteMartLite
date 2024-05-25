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

import { usePasswordResetStore } from "@/routes/~_auth/store";
import {
  PasswordResetData,
  passwordResetSchema,
} from "../schemas/password-reset-schema";
import { useResetPassword } from "../services";

export const PasswordResetForm = () => {
  const { email, code, completeReset } = usePasswordResetStore();
  const { mutate, isPending, status, error } = useResetPassword();
  const navigate = useNavigate({ from: "/signup" });

  const form = useForm<PasswordResetData>({
    resolver: zodResolver(passwordResetSchema),
    mode: "onChange",
    defaultValues: {
      code,
      email,
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    switch (status) {
      case "success":
        toast.success("Password updated successfully.");
        completeReset();
        navigate({ to: "/login" });
        break;
      case "error":
        toast.error("Something went wrong. Please try again later.");
        break;
      default:
        break;
    }
  }, [status, navigate, error, completeReset]);

  const onSubmit = (data: PasswordResetData) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[250px] space-y-8 md:w-[350px]"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your new password" {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm your new password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <LoadingButton className="w-full" loading={isPending}>
            Reset Password
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
