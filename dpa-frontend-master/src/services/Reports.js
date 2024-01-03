import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Reports
export async function getReports() {
  const response = await request({
    endpoint: `/api/reports`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getReports-success]: ", response.data.data);

  return {
    status: true,
    reports: response.data.data,
  };
}

// Send Reports
export async function sendReports(body) {
  const response = await request({
    endpoint: `/api/reports`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendReports-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Reports
export async function updateReports(id, body) {
  const response = await request({
    endpoint: `/api/reports/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateReports-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Reports
export async function deleteReports(id) {
  const response = await request({
    endpoint: `/api/reports/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteReports-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Reports
export async function disabledReports(id) {
  const response = await request({
    endpoint: `/api/reports/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledReports-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Reports
export async function activeReports(id) {
  const response = await request({
    endpoint: `/api/reports/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeReports-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeReports-success]: ", response.data);

  return {
    status: true,
  };
}
