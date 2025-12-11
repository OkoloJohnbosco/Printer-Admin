import Home from "@/modules/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <div>
      <Home />
    </div>
  );
}
