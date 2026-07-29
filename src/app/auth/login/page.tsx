import Loader from "@/components/ui/loader";
import LoginSignupTab from "@/modules/auth/components/login-signup-toggler";
import LoginForm from "@/modules/auth/templates/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login · Printa",
  description:
    "Printa Login - Access your account to explore electric vehicles",
  keywords: "Printa, sign up, electric vehicles, EV marketplace, Nigeria",
};

function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="page-fade-in space-y-8">
        <LoginSignupTab />
        <LoginForm />
      </div>
    </Suspense>
  );
}

export default LoginPage;
