"use client";
import CheckEmailForm from "../check-email-form";

export default function VerifyForgotPasswordForm() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full space-y-6">
        <CheckEmailForm />
      </div>
    </div>
  );
}
