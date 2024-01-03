import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Settings
export async function getSettings(queryString) {
  const response = await request({
    endpoint: `/api/configs` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getSettings-success]: ", response.data.data);

  return {
    status: true,
    settings: response.data.data,
  };
}

// Send Settings
export async function sendSettings(body) {
  const response = await request({
    endpoint: `/api/configs`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendSettings-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Settings
export async function updateSettings(id, body) {
  const response = await request({
    endpoint: `/api/configs/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateSettings-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Settings
export async function deleteSettings(id) {
  const response = await request({
    endpoint: `/api/configs/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteSettings-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Settings
export async function disabledSettings(id) {
  const response = await request({
    endpoint: `/api/configs/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledSettings-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Settings
export async function activeSettings(id) {
  const response = await request({
    endpoint: `/api/configs/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeSettings-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeSettings-success]: ", response.data);

  return {
    status: true,
  };
}

// Get View Configs
export async function getViewConfigs() {
  const response = await request({
    endpoint: `/view/configs`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getViewConfigs-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getViewConfigs-success]: ", response.data);

  return {
    status: true,
    configs: response.data.data,
  };
}
