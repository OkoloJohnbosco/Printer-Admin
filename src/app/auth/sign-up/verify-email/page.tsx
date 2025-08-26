import Loader from "@/components/ui/loader";
import VerifyForgotPasswordForm from "@/modules/auth/templates/verify-forgot-password-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Verfiy Sign Up Email · Evoolv",
  description:
    "Evoolv verify forgot password email - Confirm your email to recovery your password",
  keywords:
    "Evoolv, verify forgot password email, electric vehicles, EV marketplace, Nigeria",
};

function VerifyForgottenPasswordEmail() {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyForgotPasswordForm />
    </Suspense>
  );
}

export default VerifyForgottenPasswordEmail;
