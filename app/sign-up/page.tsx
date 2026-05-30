import type { Metadata } from "next";

import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Sign Up - Quarix",
  description: "Create your Quarix account.",
};

export default function SignUpPage() {
  return <AuthCard mode="sign-up" />;
}
