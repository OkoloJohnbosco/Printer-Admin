"use client";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function BackButton({ text, href }: { text: React.ReactNode; href?: string }) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="text-md cursor-pointer gap-3 px-0 hover:bg-transparent"
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-white text-[#23262F]">
        <MoveLeft className="size-4" />
      </span>
      {text}
    </Button>
  );
}

export default BackButton;
