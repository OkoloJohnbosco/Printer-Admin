"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetSystemConfigCatalog from "@/lib/hooks/system-config/use-get-system-config-catalog";
import type { ConfigCatalogItem } from "@/lib/hooks/system-config/use-get-system-config-catalog/use-get-system-config-catalog.types";
import { cn } from "@/lib/utils";
import { Plus, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CreateConfigModal } from "./components/create-config-modal";
import { SystemConfigCard } from "./components/system-config-card";
import { SystemConfigSkeleton } from "./components/system-config-skeleton";

const tabs = [
  { title: "All", value: "all" },
  { title: "Configured", value: "configured" },
  { title: "Unconfigured", value: "unconfigured" },
];

export default function SystemConfigPageTemplate() {
  const { value, isLoading, refetch, isFetching } = useGetSystemConfigCatalog();
  const catalogItems = useMemo(
    () => (value?.data || []) as ConfigCatalogItem[],
    [value?.data],
  );
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = useMemo(() => {
    if (activeTab === "configured") {
      return catalogItems.filter((item) => item.configured);
    }
    if (activeTab === "unconfigured") {
      return catalogItems.filter((item) => !item.configured);
    }
    return catalogItems;
  }, [catalogItems, activeTab]);

  const configuredCount = catalogItems.filter((item) => item.configured).length;
  const unconfiguredCount = catalogItems.length - configuredCount;

  return (
    <div className="page-fade-in w-full">
      <main>
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">
            System Configuration
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Choose from backend-supported configuration keys and edit values
            with the correct format.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Supported Configs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{catalogItems.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Configured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{configuredCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unconfigured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unconfiguredCount}</div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Value Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(catalogItems.map((item) => item.valueType)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 shadow-none">
          <CardContent className="pt-6">
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <CreateConfigModal
                catalogItems={catalogItems}
                onSuccess={refetch}
                trigger={
                  <Button size="sm" disabled={unconfiguredCount === 0}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Config
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">
              Configuration Catalog{" "}
              <span className="text-muted-foreground text-sm font-normal">
                ({filteredItems.length})
              </span>
            </h2>

            <div className="bg-brand-gray-50 flex shrink-0 items-center gap-2 overflow-hidden rounded-full">
              {tabs.map((tab) => (
                <Button
                  key={tab.value}
                  value={activeTab}
                  onClick={() => setActiveTab(tab.value)}
                  variant="ghost"
                  className={cn(
                    "text-foundation-black-300 items-center justify-center px-3 font-normal hover:bg-transparent sm:px-6",
                    tab.value === activeTab && "text-white",
                  )}
                >
                  <span
                    className={cn(
                      tab.value === activeTab
                        ? "text-white"
                        : "text-foundation-black-300",
                      "z-10 capitalize duration-200 ease-in-out",
                    )}
                  >
                    {tab.title}
                  </span>

                  {tab.value === activeTab ? (
                    <motion.span
                      className="absolute top-0 left-0 h-full w-full rounded-full bg-black"
                      layoutId="underline-config"
                    />
                  ) : null}
                </Button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <SystemConfigSkeleton />
          ) : filteredItems.length === 0 ? (
            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="text-muted-foreground mb-4 text-center">
                  {activeTab === "all"
                    ? "No supported configurations returned by the backend catalog."
                    : `No ${activeTab} configurations found.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((catalogItem) => (
                <SystemConfigCard
                  key={catalogItem.key}
                  catalogItem={catalogItem}
                  onSuccess={refetch}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
