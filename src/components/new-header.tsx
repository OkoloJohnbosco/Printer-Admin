import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { NavUser } from "./nav-user";
import { Button } from "./ui/button";
import Heading from "./ui/heading";

const data = {
  user: {
    name: "Damola Sodiq",
    email: "Print Hub",
    avatar: "/avatars/shadcn.jpg",
  },
};

function NavHeader() {
  return (
    <header className="flex h-16 shrink-0 z-10 items-center bg-white gap-2 sticky top-0 transition-[width,height] ease-linear">
      <div className="flex px-4 w-full items-center justify-between">
        <div className="flex -ml-3 items-center gap-2 px-4">
          <SidebarTrigger />
          <Heading size="h5">Dashboard</Heading>
        </div>
        <div className="flex gap-1 items-center">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <NavUser user={data.user} />
        </div>
      </div>
    </header>
  );
}

export default NavHeader;
