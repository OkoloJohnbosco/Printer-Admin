import Heading from "@/components/ui/heading";
import Image from "next/image";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="page-fade-in grid min-h-screen grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="relative hidden grid-cols-2 overflow-hidden lg:grid">
        <div className="bg-brand-blue-300 h-full w-full"></div>
        <div>
          <Image
            src={"/bg-2.jpg"}
            alt="background image"
            width={500}
            height={500}
            priority
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <Image
            src={"/bg.jpg"}
            alt="background image"
            width={500}
            height={500}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="bg-brand-foreground h-full w-full"></div>

        <div className="absolute top-2/5 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col">
          <div className="mx-auto w-fit">
            <Image
              src={"/logo.svg"}
              alt="logo image"
              width={200}
              height={200}
              priority
            />
          </div>
          <div className="auth-hero relative flex flex-col items-center justify-center overflow-visible text-center">
            <Heading className="whitespace-nowrap">
              Ready to Bring Your Prints to Life? 🚀
            </Heading>
            <p className="text-brand-neutral-dark text-sm">
              Create your account in seconds and start printing cool <br />{" "}
              stuff — locally, sustainably, and stress-free.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center p-6">
        <div className="bg-brand-gray-500 mx-auto my-auto w-full max-w-lg rounded-2xl p-6">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
