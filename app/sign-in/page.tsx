import type { Metadata } from "next";

import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Sign In - Quarix",
  description: "Sign in to your Quarix account.",
};

export default function SignInPage() {
  return <AuthCard mode="sign-in" />;
}
