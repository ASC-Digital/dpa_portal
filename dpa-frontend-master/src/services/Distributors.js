import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Distributors
export async function getDistributors() {
  const response = await request({
    endpoint: `/api/distributors`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getDistributors-success]: ", response.data.data);

  return {
    status: true,
    distributors: response.data.data,
  };
}

// Send Distributors
export async function sendDistributors(body) {
  const response = await request({
    endpoint: `/api/distributors`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendDistributors-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Distributors
export async function updateDistributors(id, body) {
  const response = await request({
    endpoint: `/api/distributors/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateDistributors-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Distributors
export async function deleteDistributors(id) {
  const response = await request({
    endpoint: `/api/distributors/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteDistributors-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Distributors
export async function disabledDistributors(id) {
  const response = await request({
    endpoint: `/api/distributors/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledDistributors-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Distributors
export async function activeDistributors(id) {
  const response = await request({
    endpoint: `/api/distributors/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeDistributors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeDistributors-success]: ", response.data);

  return {
    status: true,
  };
}
