import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { ForgotPasswordData, forgotPasswordSchema } from "./schemas";
import { useForgotPassword } from "./services";

export const Route = createLazyFileRoute("/_auth/forgot-password")({
  component: ForgotPassword,
});

export default function ForgotPassword() {
  const { setEmail, clearData } = usePasswordResetStore();
  const { mutateAsync, isPending, status, error } = useForgotPassword();
  const navigate = useNavigate({ from: "/signup" });

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    clearData();
    switch (status) {
      case "success":
        toast.success("OTP sent to email.");
        setEmail(form.getValues("email"));
        navigate({ to: "/reset-password" });
        break;
      case "error":
        toast.error("Something went wrong. Please try again later.");
        break;
      default:
        break;
    }
  }, [status, navigate, error, form, setEmail, clearData]);

  const onSubmit = async (data: ForgotPasswordData) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium tracking-tight">Forgot Password</h1>
        <p className="text-center text-sm text-muted-foreground">
          Enter the your email address and we'll
          <br />
          send you a OTP code to reset your password
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[250px] space-y-8 md:w-[350px]"
        >
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

          <div>
            <LoadingButton className="w-full" loading={isPending}>
              Send Code
            </LoadingButton>
          </div>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?
        <Link
          to="/login"
          className="ml-2 text-secondary-foreground transition hover:opacity-50"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
