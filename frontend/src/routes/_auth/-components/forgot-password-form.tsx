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

import { ForgotPasswordSchema } from "@/schemas/auth";
import { useForgotPassword } from "@/services/auth";
import { usePasswordResetStore } from "@/store/auth";
import { ForgotPasswordData } from "@/types/auth";

export const ForgotPasswordForm = () => {
  const { setEmail, clearData } = usePasswordResetStore();
  const { mutateAsync, isPending, status, error } = useForgotPassword();
  const navigate = useNavigate({ from: "/signup" });

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
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
  );
};
