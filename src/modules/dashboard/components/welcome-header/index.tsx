import Heading from "@/components/ui/heading";

function WelcomeHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Heading size={"h4"}>Welcome back, Admin!</Heading>
        <p className="text-xs">
          Here&apos;s what&apos;s happening on the platform today.
        </p>
      </div>
    </div>
  );
}

export default WelcomeHeader;
