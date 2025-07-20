import WelcomeHeader from "@/modules/main/dashboard/components/welcome-header";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <WelcomeHeader isVerified={true} />
    </div>
  );
}
