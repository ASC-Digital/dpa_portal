import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Send Power BI
export async function sendPowerBI(body) {
  const response = await request({
    endpoint: `/api/powerbi`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendPowerBI-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendPowerBI-success]: ", response.data.data);

  return {
    status: true,
    data: response.data.data,
  };
}
