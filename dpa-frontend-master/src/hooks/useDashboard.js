import { getDashboard } from "@/services/Dashboard";
import { toastrMessage } from "@/utils/Toastr";

export default function useDashboard() {
  async function getData() {
    const response = await getDashboard();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.dashboard;
  }

  return { getData };
}
