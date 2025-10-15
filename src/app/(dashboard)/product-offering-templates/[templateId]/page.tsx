import ViewOfferingTemplatePageTemplate from "@/modules/view-offering-template";

async function ViewTemplateDetailsPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  return <ViewOfferingTemplatePageTemplate templateId={templateId} />;
}

export default ViewTemplateDetailsPage;
