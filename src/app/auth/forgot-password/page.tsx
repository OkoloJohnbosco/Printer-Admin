import Loader from "@/components/ui/loader";
import AuthProgress from "@/modules/auth/components/auth-progress";
import ForgotPasswordForm from "@/modules/auth/templates/forgot-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Forgot Password · Evoolv",
  description: "Evoolv forgot password - Reset your password to regain access",
  keywords:
    "Evoolv, forgot password, electric vehicles, EV marketplace, Nigeria",
};

function ForgotPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="page-fade-in space-y-8">
        <AuthProgress />
        <ForgotPasswordForm />
      </div>
    </Suspense>
  );
}

export default ForgotPasswordPage;
