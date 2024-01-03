import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Products
export async function getProducts(queryString) {
  const response = await request({
    endpoint: `/api/products` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getProducts-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getProducts-success]: ", response.data);

  return {
    status: true,
    products: response.data.data,
  };
}

// Send Products
export async function sendProducts(body) {
  const response = await request({
    endpoint: `/api/products`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    console.log("[sendProducts-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[sendProducts-success]: ", response.data);

  return {
    status: true,
  };
}

// Update Products
export async function updateProducts(id, body) {
  const response = await request({
    endpoint: `/api/products/${id}`,
    method: "PUT",
    body: body,
  });

  if (!response.status) {
    console.log("[updateProducts-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateProducts-success]: ", response.data);

  return {
    status: true,
  };
}

// Remove Products
export async function deleteProducts(id) {
  const response = await request({
    endpoint: `/api/products/${id}`,
    method: "DELETE",
  });

  if (!response.status) {
    console.log("[deleteProducts-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[deleteProducts-success]: ", response.data);

  return {
    status: true,
  };
}

// Send Products
export async function buyProducts(id, body) {
  const response = await request({
    endpoint: `/api/products/buy/${id}`,
    method: "POST",
    body: body,
  });

  if (!response.status) {
    return { status: false, message: response.message };
  }

  console.log("[buyProducts-success]: ", response.data);

  return {
    status: true,
  };
}
