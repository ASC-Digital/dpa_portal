import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Permissions
export async function getPermissions() {
  const response = await request({
    endpoint: `/api/permissions`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getPermissions-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getPermissions-success]: ", response.data.data);

  return {
    status: true,
    permissions: response.data.data,
  };
}
