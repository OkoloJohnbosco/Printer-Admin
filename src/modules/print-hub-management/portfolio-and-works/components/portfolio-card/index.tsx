"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Heading from "@/components/ui/heading";
import { Label } from "@/components/ui/label";
import { EyeOff, PenLine, Tag, Trash2 } from "lucide-react";
import Image from "next/image";

export function PortfolioCard() {
  return (
    <div className="flex flex-col gap-6">
      <Label className="hover:bg-accent/50 relative bg-white flex flex-col items-start overflow-hidden gap-3 rounded-lg border has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700 absolute top-2 left-2"
        />

        <div className="rounded-lg mx-auto w-full max-h-[200px]">
          <Image
            height={250}
            width={300}
            src="/portfolio.jpg"
            alt=""
            className="object-cover max-h-[200px]"
          />
        </div>
        <div className="grid gap-1.5 font-normal p-3">
          <Heading size="h7">Premium Business Card</Heading>
          <Badge variant="secondary">
            <Tag />
            Posters
          </Badge>
          <p className="text-muted-foreground text-xs">
            Large format poster with vibrant colors and eye-catching design for
            event promotion.
          </p>
          <div className="flex justify-between py-2 items-center">
            <p className="text-[11px]">Added May 22, 2025</p>
            <div className="flex gap-1 items-center">
              <Button variant="ghost" size="icon" className="size-4.5">
                <PenLine className="size-3" />
              </Button>
              <Button variant="ghost" size="icon" className="size-4.5">
                <EyeOff className="size-3" />
              </Button>
              <Button variant="ghost" size="icon" className="size-4.5">
                <Trash2 className="size-3" />
              </Button>
            </div>
          </div>
        </div>
      </Label>
    </div>
  );
}
