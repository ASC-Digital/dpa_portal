import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Dashboard
export async function getDashboard() {
  const response = await request({
    endpoint: `/api/dashboard`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getDashboard-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getDashboard-success]: ", response.data);

  return {
    status: true,
    dashboard: response.data.data,
  };
}
