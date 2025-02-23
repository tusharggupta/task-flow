import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":projectId"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.projects)[":projectId"]["$delete"]
>;

export const useDeleteProject = () => {
  const workspaceId = useWorkspaceId();

  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      const response = await client.api.projects[":projectId"]["$delete"]({
        param,
      });
      if (!response.ok) {
        throw new Error("Failed to delete project");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      // router.refresh();
      toast.success("Project deleted");
      window.location.href = `/workspaces/${workspaceId}`;

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects", data.$id] });
      queryClient.refetchQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
