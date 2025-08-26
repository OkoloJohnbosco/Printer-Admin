import Loader from "@/components/ui/loader";
import LoginSignupTab from "@/modules/auth/components/login-signup-toggler";
import SignUpForm from "@/modules/auth/templates/sign-up";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up · Evoolv",
  description:
    "Evoolv Sign up - Create your account to explore electric vehicles",
  keywords: "Evoolv, sign up, electric vehicles, EV marketplace, Nigeria",
  openGraph: {
    title: "Evoolv - Sign up",
    description:
      "Evoolv Sign up - Create your account to explore electric vehicles",
    url: "https://evoolv.com/auth/verify-email",
    siteName: "Evoolv",
    images: [
      {
        url: "https://www.staging.evoolv.com/evoolv.svg",
        width: 1200,
        height: 630,
        alt: "Evoolv - Sign up",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evoolv - Sign up",
    description:
      "Evoolv Sign up - Create your account to explore electric vehicles",
    images: ["https://www.staging.evoolv.com/evoolv.svg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    noimageindex: false,
    nosnippet: false,
  },
};

function SignUpPage() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="page-fade-in space-y-8">
        <LoginSignupTab />
        <SignUpForm />
      </div>
    </Suspense>
  );
}

export default SignUpPage;
