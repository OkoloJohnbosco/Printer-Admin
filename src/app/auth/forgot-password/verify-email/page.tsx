import Loader from "@/components/ui/loader";
import AuthProgress from "@/modules/auth/components/auth-progress";
import VerifyForgotPasswordForm from "@/modules/auth/templates/verify-forgot-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verfiy Forgot Password Email · Printa",
  description:
    "Printa verify forgot password email - Confirm your email to recovery your password",
  keywords:
    "Printa, verify forgot password email, electric vehicles, EV marketplace, Nigeria",
};

function VerifyForgottenPasswordEmail() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="page-fade-in space-y-8">
        <AuthProgress activeStep={2} />
        <VerifyForgotPasswordForm />
      </div>
    </Suspense>
  );
}

export default VerifyForgottenPasswordEmail;
