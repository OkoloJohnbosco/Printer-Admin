"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DiscountCodesHeader from "./components/discount-codes-header";
import DiscountCodesTable from "./components/discount-codes-table";

export default function DiscountCodesPageTemplate() {
  return (
    <main className="page-fade-in w-full">
      <DiscountCodesHeader />

      <Card className="@container/card shadow-none">
        <CardHeader>
          <CardTitle>Discount Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <DiscountCodesTable />
        </CardContent>
      </Card>
    </main>
  );
}
