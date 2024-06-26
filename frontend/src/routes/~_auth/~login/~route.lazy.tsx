import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Hint } from "@/components/hint";
import { LoadingButton } from "@/components/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { LoginData, loginSchema } from "./schemas";
import { useLogin } from "./services";

import { usePasswordResetStore } from "@/routes/~_auth/store";

export const Route = createLazyFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const { clearData } = usePasswordResetStore();

  const { mutateAsync, isPending, status, error } = useLogin();
  const navigate = useNavigate({ from: "/signup" });

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  useEffect(() => {
    switch (status) {
      case "success":
        toast.success("Successfully logged in!");
        navigate({ to: "../" });
        break;
      case "error":
        toast.error(error.response.data.message);
        break;
      default:
        break;
    }
  }, [status, navigate, error]);

  const onSubmit = async (data: LoginData) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    clearData();
  }, [clearData]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium tracking-tight">Welcome Again!</h1>
        <p className="text-center text-sm text-muted-foreground">
          Enter your credentials to continue shopping.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[250px] space-y-8 md:w-[350px]"
        >
          <div className="space-y-4">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                    <Link
                      preload="intent"
                      to="/forgot-password"
                      className="float-right font-normal text-secondary-foreground transition hover:opacity-50"
                    >
                      Forgot Password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
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
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border px-3 py-2.5 shadow-sm">
                  <FormLabel>Remember</FormLabel>

                  <div className="flex flex-row items-center space-y-0 leading-none">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Hint
                      label="You will be logged in for 30 days"
                      side="right"
                      align="center"
                      asChild
                    >
                      <InfoCircledIcon className="ml-2 h-5 w-5 text-foreground" />
                    </Hint>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <LoadingButton className="w-full" loading={isPending}>
              Login
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
