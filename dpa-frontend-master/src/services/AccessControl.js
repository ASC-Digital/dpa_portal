import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

const ENDPOINT = `/api/access-control`;

// Get Access Control
export async function getAccessControl(queryString = '') {
  const response = await request({
    endpoint: `${ENDPOINT}${queryString}`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getAccessControl-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getAccessControl-success]: ", response.data.data);

  return {
    status: true,
    accessControl: response.data.data.data.sort((a, b) => b.id - a.id),
    total: response.data.data.total,
  };
}
