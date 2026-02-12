"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProductSubCategories from "@/lib/hooks/admin/use-get-all-product-sub-categories";
import { useState } from "react";
import OfferingTemplateHeader from "./components/offering-template-header";
import OfferingTemplateTable from "./components/offering-template-table";

export default function OfferingTemplatePageTemplate() {
  const [subCategoryId, setSubCategoryId] = useState("all");
  const getProductSubCategories = useGetProductSubCategories();

  return (
    <main className="page-fade-in w-full">
      <OfferingTemplateHeader />

      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="shrink-0">All Offering Templates </CardTitle>
          <div className="w-full space-y-1 sm:max-w-[300px] sm:text-right">
            <Select value={subCategoryId} onValueChange={setSubCategoryId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-Categories</SelectItem>
                <>
                  {getProductSubCategories?.value?.data?.map((subCategory) => (
                    <SelectItem key={subCategory?.id} value={subCategory?.id}>
                      {subCategory?.name}
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <OfferingTemplateTable
            subCategoryId={subCategoryId === "all" ? "" : subCategoryId}
          />
        </CardContent>
      </Card>
    </main>
  );
}
