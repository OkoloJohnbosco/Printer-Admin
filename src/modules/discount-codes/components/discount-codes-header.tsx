"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateDiscountCodeModal from "./create-discount-code-modal";

export default function DiscountCodesHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Heading size="h4">Discount Codes</Heading>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Discount Code
        </Button>
      </div>

      <CreateDiscountCodeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
