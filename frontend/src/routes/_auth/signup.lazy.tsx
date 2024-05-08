import { createLazyFileRoute } from "@tanstack/react-router";

import { SignupForm } from "./-components/signup-form";

export const Route = createLazyFileRoute("/_auth/signup")({
  component: Signup,
});

function Signup() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-medium tracking-tight">Start Shopping!</h1>
        <p className="text-center text-sm text-muted-foreground">
          Simply enter your details to begin shopping!
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
