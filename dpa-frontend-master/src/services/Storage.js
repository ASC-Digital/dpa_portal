import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Transactions
export async function uploadFile(body) {
  const response = await request({
    endpoint: `/api/storage/upload`,
    method: "POST",
    body,
  });

  if (!response.status) {
    console.log("[uploadFile-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[uploadFile-success]: ", response.data);

  return {
    status: true,
    photoUrl: response.data.data.url,
  };
}
