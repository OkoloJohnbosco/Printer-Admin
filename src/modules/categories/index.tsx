"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productCategories } from "@/lib/constants";
import CategoryHeader from "./components/category-header";
import CategoryTable from "./components/category-table";

export default function CategoriesPageTemplate() {
  return (
    <main className="page-fade-in w-full">
      <CategoryHeader />

      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>All Categories ({productCategories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryTable categories={productCategories} />
        </CardContent>
      </Card>
    </main>
  );
}
