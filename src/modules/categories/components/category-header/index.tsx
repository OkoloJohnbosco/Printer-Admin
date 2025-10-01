import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import useDisclosure from "@/lib/hooks/common/use-disclosure";
import { Plus } from "lucide-react";
import CreateEditCategoryModal from "../create-edit-category-modal";

function CategoryHeader() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="space-y-2">
        <Heading size="h4">Categories & Sub-Categories</Heading>
        <p className="text-muted-foreground">
          Manage product categories and sub-categories for your print hub
          catalog
        </p>
      </div>
      <Button onClick={onOpen}>
        <Plus className="h-4 w-4" />
        Add Category
      </Button>
      <CreateEditCategoryModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default CategoryHeader;
