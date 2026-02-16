import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import { Plus } from "lucide-react";
import CreateEditCategoryModal from "../create-edit-category-modal";

function CategoryHeader() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 sm:space-y-2">
        <Heading size="h4">Categories</Heading>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage product categories for your print hub catalog
        </p>
      </div>
      <Button onClick={onOpen} className="w-full sm:w-auto">
        <Plus className="h-4 w-4" />
        Add Category
      </Button>
      <CreateEditCategoryModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default CategoryHeader;
