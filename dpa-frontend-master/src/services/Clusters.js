import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Clusters
export async function getClusters() {
  const response = await request({
    endpoint: `/api/clusters`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getClusters-success]: ", response.data.data);

  return {
    status: true,
    clusters: response.data.data,
  };
}

// Send Clusters
export async function sendClusters(body) {
  const response = await request({
    endpoint: `/api/clusters`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendClusters-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Clusters
export async function updateClusters(id, body) {
  const response = await request({
    endpoint: `/api/clusters/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateClusters-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Clusters
export async function deleteClusters(id) {
  const response = await request({
    endpoint: `/api/clusters/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteClusters-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Clusters
export async function disabledClusters(id) {
  const response = await request({
    endpoint: `/api/clusters/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledClusters-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Clusters
export async function activeClusters(id) {
  const response = await request({
    endpoint: `/api/clusters/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeClusters-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeClusters-success]: ", response.data);

  return {
    status: true,
  };
}
