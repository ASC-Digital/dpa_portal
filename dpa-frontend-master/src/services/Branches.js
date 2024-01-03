import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Branches
export async function getBranches() {
  const response = await request({
    endpoint: `/api/company-branches`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getBranches-success]: ", response.data.data);

  return {
    status: true,
    branches: response.data.data,
  };
}

// Send Branches
export async function sendBranches(body) {
  const response = await request({
    endpoint: `/api/company-branches`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendBranches-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Branches
export async function updateBranches(id, body) {
  const response = await request({
    endpoint: `/api/company-branches/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateBranches-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Branches
export async function deleteBranches(id) {
  const response = await request({
    endpoint: `/api/company-branches/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteBranches-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Branches
export async function disabledBranches(id) {
  const response = await request({
    endpoint: `/api/company-branches/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledBranches-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Branches
export async function activeBranches(id) {
  const response = await request({
    endpoint: `/api/company-branches/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeBranches-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeBranches-success]: ", response.data);

  return {
    status: true,
  };
}
