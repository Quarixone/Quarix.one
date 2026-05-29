import type { Metadata } from "next";

import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = {
  title: "Login - Quarix",
  description: "Login to your Quarix account.",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
