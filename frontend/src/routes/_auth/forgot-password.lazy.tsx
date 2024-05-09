import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { ForgotPasswordForm } from "./-components/forgot-password-form";

export const Route = createLazyFileRoute("/_auth/forgot-password")({
  component: ForgotPassword,
});

export default function ForgotPassword() {
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
      <ForgotPasswordForm />

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
