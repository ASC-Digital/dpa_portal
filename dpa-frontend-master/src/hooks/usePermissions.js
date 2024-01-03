import { getPermissions } from "@/services/Permissions";
import { toastrMessage } from "@/utils/Toastr";

export default function usePermissions() {
  async function getData() {
    const response = await getPermissions();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.permissions.sort((a, b) => a.id - b.id);
  }

  return { getData };
}
