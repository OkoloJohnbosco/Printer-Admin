import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressInfoTemplate from "../../templates/address-info-template";
import BusinessInfoTemplate from "../../templates/business-info-template";
import ChangePasswordTemplate from "../../templates/change-password-template";
import PersonalInfoTemplate from "../../templates/personal-info-template";
import TwoFactorAuthTemplate from "../../templates/two-factor-auth-template";

export function AccountTabLayout() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="account">Personal Information</TabsTrigger>
          <TabsTrigger value="password">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="space-y-4">
            <PersonalInfoTemplate />
            <BusinessInfoTemplate />
            <AddressInfoTemplate />
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="space-y-4">
            <ChangePasswordTemplate />
            <TwoFactorAuthTemplate />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
