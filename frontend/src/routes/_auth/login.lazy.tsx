import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { LoginForm } from "./-components/login-form";

import { usePasswordResetStore } from "@/store/auth";

export const Route = createLazyFileRoute("/_auth/login")({
  component: Login,
});

function Login() {
  const { clearData } = usePasswordResetStore();

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
      <LoginForm />
    </div>
  );
}
