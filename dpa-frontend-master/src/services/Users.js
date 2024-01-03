import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Users
export async function getUsers() {
  const response = await request({
    endpoint: `/api/users`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUsers-success]: ", response.data.data);

  return {
    status: true,
    users: response.data.data,
  };
}

// Get User by id

export async function getUserById(id) {
  const response = await request({
    endpoint: `/api/users/${id}`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUsers-success]: ", response.data.data);

  return {
    status: true,
    users: response.data.data,
  };
}

// Send Users
export async function sendUsers(body) {
  const response = await request({
    endpoint: `/api/users`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendUsers-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Users
export async function updateUsers(id, body) {
  const response = await request({
    endpoint: `/api/users/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateUsers-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Users
export async function deleteUsers(id) {
  const response = await request({
    endpoint: `/api/users/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteUsers-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Users
export async function disabledUsers(id) {
  const response = await request({
    endpoint: `/api/users/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledUsers-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Users
export async function activeUsers(id) {
  const response = await request({
    endpoint: `/api/users/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeUsers-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeUsers-success]: ", response.data);

  return {
    status: true,
  };
}
