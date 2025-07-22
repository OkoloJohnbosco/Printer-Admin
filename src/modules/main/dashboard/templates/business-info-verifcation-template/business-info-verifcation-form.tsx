import { Button } from "@/components/ui/button";
import DragNdrop from "@/components/ui/file-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { BusinessInfoVerificationFormSchema } from "./business-info.schema";

function BusinessInfoVerificationForm() {
  const form = useForm<z.infer<typeof BusinessInfoVerificationFormSchema>>({
    resolver: zodResolver(BusinessInfoVerificationFormSchema),
    defaultValues: {
      business_email: "",
      business_address: "",
      business_name: "",
      business_phone: "",
      business_type: "",
      business_logo: undefined,
      business_license: undefined,
      equipment_inventory: undefined,
      tax_registration: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof BusinessInfoVerificationFormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="page-fade-in flex flex-1 flex-col space-y-4 scroll-smooth"
        >
          <div className="space-y-4 px-4">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter registered business name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-1 gap-x-4 items-start md:grid-cols-2">
              <FormField
                control={form.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Business Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="company@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Business Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="business_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Business Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter complete address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid w-full grid-cols-1 gap-x-4 items-start md:grid-cols-3">
              <FormField
                control={form.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>City</FormLabel>
                    <FormControl>
                      <Input placeholder="company@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="business_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>State</FormLabel>
                    <FormControl>
                      <Input placeholder="+234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isRequired>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="company@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="business_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Tax ID Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter complete address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"business_logo"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Business Logo</FormLabel>
                  <FormControl>
                    <DragNdrop
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      helperText="business logo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"business_license"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Business Licence</FormLabel>
                  <FormControl>
                    <DragNdrop
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      helperText="business licence"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"tax_registration"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Tax Registration</FormLabel>
                  <FormControl>
                    <DragNdrop
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      helperText="tax registration"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"equipment_inventory"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequired>Equipment Inventory</FormLabel>
                  <FormControl>
                    <DragNdrop
                      id={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      helperText="equipment inventory"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end items-center bg-brand-gray-500 z-10 sticky bottom-0 py-5 gap-3 border-t">
            <Button variant="outline">Cancel</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default BusinessInfoVerificationForm;
