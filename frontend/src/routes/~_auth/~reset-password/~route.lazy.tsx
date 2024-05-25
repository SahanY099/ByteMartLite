import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { OtpVerifyForm } from "./components/otp-verify-form";
import { PasswordResetForm } from "./components/password-reset-form";

import { usePasswordResetStore } from "@/routes/~_auth/store";

export const Route = createLazyFileRoute("/_auth/reset-password")({
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate({ from: "/reset-password" });
  const { code, email, resetIsComplete } = usePasswordResetStore();

  useEffect(() => {
    if (!email && !resetIsComplete) {
      navigate({ to: "/forgot-password" });
      return;
    }
  }, [email, navigate, resetIsComplete]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium tracking-tight">Reset Password</h1>
        <p className="text-center text-sm text-muted-foreground">
          Enter OTP code sent to your email to reset password
        </p>
      </div>

      {code ? <PasswordResetForm /> : <OtpVerifyForm />}
    </div>
  );
}
