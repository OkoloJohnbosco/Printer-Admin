import Loader from "@/components/ui/loader";
import AuthProgress from "@/modules/auth/components/auth-progress";
import ResetPasswordForm from "@/modules/auth/templates/reset-password";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password · Evoolv",
  description: "Evoolv reset password - Regain access to your account",
  keywords:
    "Evoolv, reset password, electric vehicles, EV marketplace, Nigeria",
};

function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="page-fade-in space-y-8">
        <AuthProgress activeStep={3} />
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
}

export default ResetPasswordPage;
