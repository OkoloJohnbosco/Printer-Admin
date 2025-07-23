import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Headset, PillBottle, Plus, Star } from "lucide-react";
import Image from "next/image";

function BuildYourPortfolioTemplate({
  onAddWorkModalOpen,
}: {
  onAddWorkModalOpen: () => void;
}) {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="grid gap-6">
        <div className="space-y-10">
          <div className="text-center space-y-4 w-full max-w-lg mx-auto">
            <div className="rounded-lg mx-auto w-fit">
              <Image
                height={200}
                width={200}
                src="/portfolio.jpg"
                alt=""
                className="rounded-2xl"
              />
            </div>
            <div className="space-y-1">
              <Heading className="font-[700]" size="h4">
                Start Building Your Portfolio
              </Heading>
              <p className="text-nm text-brand-gray-300">
                Showcase your best print works and attract more customers. Your
                portfolio helps build trust and demonstrates your printing
                expertise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-brand-gray-300">
            <div className="p-4 border rounded-lg space-y-4">
              <Heading className="font-[700]" size="h7">
                Why Create a Portfolio?
              </Heading>

              <div className="space-y-4">
                <div className="text-xs flex items-center gap-x-3">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-8 w-8 rounded-full inline-flex justify-center items-center bg-[#4F46E51A]">
                      <Star className="size-4" />
                    </span>
                  </span>

                  <div>
                    <p className="font-bold text-sm text-brand-gray-400">
                      Showcase Your Expertise
                    </p>
                    <p>
                      Display your best work and highlight your printing
                      capabilities
                    </p>
                  </div>
                </div>

                <div className="text-xs flex items-center gap-x-3">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-8 w-8 rounded-full inline-flex justify-center items-center bg-[#4F46E51A]">
                      <Headset className="size-4" />
                    </span>
                  </span>

                  <div>
                    <p className="font-bold text-sm text-brand-gray-400">
                      Build Customer Trust
                    </p>
                    <p>
                      Help customers understand your quality standards and
                      service offerings
                    </p>
                  </div>
                </div>

                <div className="text-xs flex items-center gap-x-3">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-8 w-8 rounded-full inline-flex justify-center items-center bg-[#4F46E51A]">
                      <PillBottle className="size-4" />
                    </span>
                  </span>

                  <div>
                    <p className="font-bold text-sm text-brand-gray-400">
                      grow your business
                    </p>
                    <p>Attract more customers and increase your print orders</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg space-y-4">
              <Heading className="font-[700]" size="h7">
                Getting Started
              </Heading>

              <div className="space-y-4">
                <div className="text-xs flex items-start gap-x-1">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-6 w-6 rounded-full inline-flex justify-center items-center bg-brand-gray-50">
                      1
                    </span>
                  </span>

                  <p>
                    Click &quot;Add New Work&quot; to upload your first
                    portfolio item
                  </p>
                </div>
                <div className="text-xs flex items-start gap-x-1">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-6 w-6 rounded-full inline-flex justify-center items-center bg-brand-gray-50">
                      2
                    </span>
                  </span>
                  <p>Add details about your print work and specifications</p>
                </div>
                <div className="text-xs flex items-start gap-x-1">
                  <span className="flex items-center h-[1lh]">
                    <span className="h-6 w-6 rounded-full inline-flex justify-center items-center bg-brand-gray-50">
                      3
                    </span>
                  </span>
                  <p>Choose visibility settings and publish your work</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button onClick={onAddWorkModalOpen}>
              <Plus /> Add New Work
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default BuildYourPortfolioTemplate;
