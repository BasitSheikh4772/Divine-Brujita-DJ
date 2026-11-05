import type { Metadata } from "next";
import { LoginView } from "@/components/Pages";

export const metadata: Metadata = { title: "Login | Divine Brujita DJ" };

export default function LoginPage() {
  return <LoginView />;
}
