import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Banners
export async function getBanners(queryString) {
  const response = await request({
    endpoint: `/api/banners` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getBanners-success]: ", response.data.data);

  return {
    status: true,
    banners: response.data.data,
  };
}

// Send Banners
export async function sendBanners(body) {
  const response = await request({
    endpoint: `/api/banners`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendBanners-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Banners
export async function updateBanners(id, body) {
  const response = await request({
    endpoint: `/api/banners/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateBanners-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Banners
export async function deleteBanners(id) {
  const response = await request({
    endpoint: `/api/banners/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteBanners-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Banners
export async function disabledBanners(id) {
  const response = await request({
    endpoint: `/api/banners/disable/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[disabledBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[disabledBanners-success]: ", response.data);

  return {
    status: true,
  };
}

// Active Banners
export async function activeBanners(id) {
  const response = await request({
    endpoint: `/api/banners/active/${id}`,
    method: "PUT",
  });

  if (!response.status) {
    console.log("[activeBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[activeBanners-success]: ", response.data);

  return {
    status: true,
  };
}

// Get View Banners
export async function getViewBanners() {
  const response = await request({
    endpoint: `/view/banners-home`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getViewBanners-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  if (response.data.data === null) {
    return {
      status: true,
      banners: [],
    };
  }

  console.log("[getViewBanners-success]: ", response.data);

  return {
    status: true,
    banners: response.data.data,
  };
}
