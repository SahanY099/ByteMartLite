import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { usePasswordResetStore } from "@/routes/~_auth/store";
import { OtpVerifyData, otpVerifySchema } from "../schemas";
import { useResendOtp, useVerifyOtp } from "../services";

export const OtpVerifyForm = () => {
  const resendOtp = useResendOtp();
  const { setCode, email, code } = usePasswordResetStore();
  const { mutate, isPending, status, error } = useVerifyOtp();

  const form = useForm<OtpVerifyData>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      code: "",
      email,
    },
  });

  const watchCode = form.watch("code");

  const handleChange = () => {
    const verifyCode = async () => {
      await form.trigger("code");
      const codeState = form.getFieldState("code");

      if (!codeState.invalid) {
        mutate(form.getValues());
      }
    };

    watchCode && watchCode.length == 6 && !isPending && !code && verifyCode();
  };

  useEffect(() => {
    switch (status) {
      case "success":
        setCode(form.getValues("code"));
        break;
      case "error":
        if (error?.response?.data?.message) {
          form.setError("code", {
            message: error?.response?.data?.message,
          });
          form.resetField("code", { keepError: true, defaultValue: "" });
        } else toast.error("Something went wrong. Please try again later.");
        break;
    }
  }, [status, error, form, setCode]);

  return (
    <Form {...form}>
      <form
        className="w-[250px] space-y-8 md:w-[350px]"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    disabled={isPending}
                    onKeyUp={handleChange}
                    containerClassName="flex flex-row justify-between"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the OTP code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="float-right"
          type="button"
          onClick={() => resendOtp.mutate(email)}
          disabled={resendOtp.isPending || isPending}
        >
          Resend
        </Button>
      </form>
    </Form>
  );
};
