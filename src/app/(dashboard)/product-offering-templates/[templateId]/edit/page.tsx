import EditOfferingTemplatePageTemplate from "@/modules/edit-offering-template";

async function EditTemplateDetailsPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  return <EditOfferingTemplatePageTemplate templateId={templateId} />;
}

export default EditTemplateDetailsPage;
