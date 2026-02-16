"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProductCategories from "@/lib/hooks/admin/use-get-product-categories";
import { useState } from "react";
import ProductHeader from "./components/product-header";
import ProductTable from "./components/product-table";

export default function ProductsPageTemplate() {
  const [categoryId, setCategoryId] = useState("all");
  const getProductCategories = useGetProductCategories();

  return (
    <main className="page-fade-in w-full">
      <ProductHeader />

      <Card className="@container/card shadow-none">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="shrink-0">All Products</CardTitle>
          <div className="w-full space-y-1 sm:max-w-[300px] sm:text-right">
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <>
                  {getProductCategories?.value?.data?.map((category) => (
                    <SelectItem key={category?.id} value={category?.id}>
                      {category?.name}
                    </SelectItem>
                  ))}
                </>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ProductTable categoryId={categoryId === "all" ? "" : categoryId} />
        </CardContent>
      </Card>
    </main>
  );
}
