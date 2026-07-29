import Loader from "@/components/ui/loader";
import LoginSignupTab from "@/modules/auth/components/login-signup-toggler";
import SignUpForm from "@/modules/auth/templates/sign-up";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up · Printa",
  description:
    "Printa Sign up - Create your account to explore electric vehicles",
  keywords: "Printa, sign up, electric vehicles, EV marketplace, Nigeria",
  openGraph: {
    title: "Printa - Sign up",
    description:
      "Printa Sign up - Create your account to explore electric vehicles",
    url: "https://Printa.com/auth/verify-email",
    siteName: "Printa",
    images: [
      {
        url: "https://www.staging.Printa.com/Printa.svg",
        width: 1200,
        height: 630,
        alt: "Printa - Sign up",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printa - Sign up",
    description:
      "Printa Sign up - Create your account to explore electric vehicles",
    images: ["https://www.staging.Printa.com/Printa.svg"],
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
