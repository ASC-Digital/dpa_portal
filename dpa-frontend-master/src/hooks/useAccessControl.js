import { getAccessControl } from "@/services/AccessControl";
import { toastrMessage } from "@/utils/Toastr";

export default function useAccessControl() {
  async function getData(queryString) {
    const response = await getAccessControl(queryString);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response;
  }

  return {
    getData,
  };
}
