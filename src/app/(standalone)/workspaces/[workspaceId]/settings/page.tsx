import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { WorkspaceIdSettingsClient } from "./client";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");
  // if (!initialValues) {
  //   redirect(`/workspaces/${params.workspaceId}`);
  // }
  return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
