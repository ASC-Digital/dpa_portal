import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get advertisingMaterial
export async function getAdvertisingMaterial(queryString) {
  const response = await request({
    endpoint: `/api/advertisingMaterial`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[get-advertising-material-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[get-advertising-material-success]: ", response.data.data);

  return {
    status: true,
    advertisingMaterial: response.data.data,
  };
}

// Get advertisingMaterial digital
export async function getDigitalAdvertisingMaterial(queryString) {
  const response = await request({
    endpoint: `/api/advertisingMaterial/digital`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[get-advertising-material-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[get-advertising-material-success]: ", response.data.data);

  return {
    status: true,
    advertisingMaterial: response.data.data,
  };
}

// Send advertisingMaterial
export async function sendAdvertisingMaterial(body) {
  const response = await request({
    endpoint: `/api/advertisingMaterial`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[send-advertising-material-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[send-advertising-material-success]: ", response.data);

  return {
    status: true,
  };
}

// Update advertisingMaterial
export async function updateAdvertisingMaterial(id, body) {
  const response = await request({
    endpoint: `/api/advertisingMaterial/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateadvertisingMaterial-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateadvertisingMaterial-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove advertisingMaterial
export async function deleteAdvertisingMaterial(id) {
  const response = await request({
    endpoint: `/api/advertisingMaterial/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteadvertisingMaterial-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteadvertisingMaterial-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove advertisingMaterial
export async function disableAdvertisingMaterial(id) {
  const response = await request({
    endpoint: `/api/advertisingMaterial/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disableAdvertisingMaterial-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disableAdvertisingMaterial-success]: ", response.data);

  return {
    status: true,
  };
}

// Active advertisingMaterial
export async function activeAdvertisingMaterial(id) {
  const response = await request({
    endpoint: `/api/advertisingMaterial/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeAdvertisingMaterial-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeAdvertisingMaterial-success]: ", response.data);

  return {
    status: true,
  };
}

// Active DownloadedAdvertisingMaterial
export async function registerDownload(body) {
  const response = await request({
    endpoint: `/api/downloadedAdvertisingMaterial`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[downloadedAdvertisingMaterial-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[downloadedAdvertisingMaterial-success]: ", response.data);

  return {
    status: true,
  };
}
