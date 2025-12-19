"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useGetSystemConfigs from "@/lib/hooks/system-config/use-get-system-configs";
import type { ConfigItem } from "@/lib/hooks/system-config/use-get-system-configs/use-get-system-configs.types";
import { cn } from "@/lib/utils";
import { Plus, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { CreateConfigModal } from "./components/create-config-modal";
import { SystemConfigCard } from "./components/system-config-card";
import { SystemConfigSkeleton } from "./components/system-config-skeleton";

const tabs = [
  {
    title: "Normal Configs",
    value: "number",
  },
  {
    title: "Delivery Configs",
    value: "delivery",
  },
];

export default function SystemConfigPageTemplate() {
  const { value, isLoading, refetch, isFetching } = useGetSystemConfigs();
  const configs = useMemo(
    () => (value?.data || []) as ConfigItem[],
    [value?.data],
  );
  const [activeTab, setActiveTab] = useState<string>("number");

  const filteredConfigs = useMemo(() => {
    if (activeTab === "all") return configs;
    if (activeTab === "delivery") {
      return configs.filter((c) => Array.isArray(c.value));
    }
    if (activeTab === "number") {
      return configs.filter((c) => typeof c.value === "number");
    }
    return configs;
  }, [configs, activeTab]);

  return (
    <div className="page-fade-in w-full">
      <main>
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">System Configuration</h1>
          <p className="text-muted-foreground">
            Manage and configure your system settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Configs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{configs.length}</div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Delivery Configs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  configs.filter((c) =>
                    c.key.toLowerCase().includes("delivery"),
                  ).length
                }
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tier Configs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {configs.filter((c) => Array.isArray(c.value)).length}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number Configs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {configs.filter((c) => typeof c.value === "number").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
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
                onSuccess={refetch}
                trigger={
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Config
                  </Button>
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Configurations List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Configurations{" "}
              <span className="text-muted-foreground text-sm font-normal">
                ({filteredConfigs.length})
              </span>
            </h2>

            {/* Tabs */}
            <div className="bg-brand-gray-50 flex shrink-0 items-center gap-2 overflow-hidden rounded-full">
              {tabs?.map((tab) => (
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
          ) : filteredConfigs.length === 0 ? (
            <Card className="shadow-none">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <p className="text-muted-foreground mb-4 text-center">
                  {activeTab === "all"
                    ? "No system configurations yet"
                    : `No ${activeTab} configurations found`}
                </p>
                {activeTab === "all" && (
                  <CreateConfigModal
                    onSuccess={refetch}
                    trigger={
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Config
                      </Button>
                    }
                  />
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredConfigs.map((config) => (
                <SystemConfigCard
                  key={config.id}
                  config={config}
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
