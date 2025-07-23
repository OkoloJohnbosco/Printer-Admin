import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";

function TwoFactorAuthTemplate() {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <Heading size="h6" className="font-[700]">
            Two-Factor Authentication
          </Heading>
          <div className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex gap-4 items-center">
          <div className="h-10 w-10 grid place-items-center rounded-full bg-brand-gray-900">
            <Shield className="size-4 text-brand-gray-200" />
          </div>
          <div>
            <Heading className="text-sm!">
              Two-Factor Authentication is Disabled
            </Heading>
            <p className="text-xs text-brand-gray-300">
              Enable two-factor authentication to add an extra layer of security
              to your account. This helps protect your account even if your
              password is compromised.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TwoFactorAuthTemplate;
