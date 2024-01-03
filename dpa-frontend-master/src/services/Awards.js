import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Awards
export async function getAwards() {
  const response = await request({
    endpoint: `/api/awards`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getAwards-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getAwards-success]: ", response.data);

  return {
    status: true,
    awards: response.data.data,
  };
}

// Update Users
export async function updateAwards(id, body) {
  const response = await request({
    endpoint: `/api/awards/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateAwards-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateAwards-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Awards
export async function deleteAwards(id) {
  const response = await request({
    endpoint: `/api/awards/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteAwards-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteAwards-success]: ", response.data);

  return {
    status: true,
  };
}

// Send Awards
export async function uploadAwards(body) {
  const response = await request({
    endpoint: `/api/awards/import`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[uploadAwards-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[uploadAwards-success]: ", response.data);

  return {
    status: true,
  };
}
