import UserDetailsPageTemplate from "@/modules/user-details";

async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <UserDetailsPageTemplate params={{ id: userId }} />;
}

export default UserDetailPage;
