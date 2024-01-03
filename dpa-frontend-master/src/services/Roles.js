import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Roles
export async function getRoles(queryString) {
  const response = await request({
    endpoint: `/api/roles` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getRoles-success]: ", response.data.data);

  return {
    status: true,
    roles: response.data.data,
  };
}

// Send Roles
export async function sendRoles(body) {
  const response = await request({
    endpoint: `/api/roles`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendRoles-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Roles
export async function updateRoles(id, body) {
  const response = await request({
    endpoint: `/api/roles/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateRoles-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Roles
export async function deleteRoles(id) {
  const response = await request({
    endpoint: `/api/roles/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteRoles-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Roles
export async function disabledRoles(id) {
  const response = await request({
    endpoint: `/api/roles/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledRoles-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Roles
export async function activeRoles(id) {
  const response = await request({
    endpoint: `/api/roles/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeRoles-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeRoles-success]: ", response.data);

  return {
    status: true,
  };
}
