import axios from "axios";
import { URL_BACKEND, APP_API_KEY_VALUE } from "@/constants";
import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get User Profile
export async function getUserProfile(token) {
  const response = await axios.get(`${URL_BACKEND}/api/me`, {
    headers: {
      "Content-Type": "application/json",
      "X-CW-AK": APP_API_KEY_VALUE,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status) {
    console.log("[getUserProfile-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUserProfile-success]: ", response.data);

  return {
    status: true,
    profileUser: response.data.data,
  };
}

// Update User Profile
export async function updateUserProfile(body) {
  const response = await request({
    endpoint: `/api/me`,
    method: "PUT",
    body,
  });

  if (!response.status) {
    console.log("[updateUserProfile-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[updateUserProfile-success]: ", response.data);

  return {
    status: true,
    profileUser: response.data.data,
  };
}

// Get User Wallet
export async function getUserWallet(token) {
  const response = await axios.get(`${URL_BACKEND}/api/me/wallet`, {
    headers: {
      "Content-Type": "application/json",
      "X-CW-AK": APP_API_KEY_VALUE,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.status) {
    console.log("[getUserWallet-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUserWallet-success]: ", response.data);

  return {
    status: true,
    wallet: response.data.data,
  };
}

// Update User Profile
export async function getUserTransactions(userId) {
  const response = await request({
    endpoint: `/api/me/transactions/${userId}`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getUserTransactions-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUserTransactions-success]: ", response.data);

  return {
    status: true,
    transactions: response.data.data,
  };
}

// Update User Dashboard
export async function getUserDashboard() {
  const response = await request({
    endpoint: `/api/me/dashboard`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getUserDashboard-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUserDashboard-success]: ", response.data);

  return {
    status: true,
    dashboard: response.data.data,
  };
}

// Update User Reports
export async function getUserReports(queryString) {
  const response = await request({
    endpoint: `/api/me/reports` + queryString,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getUserRepors-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getUserRepors-success]: ", response.data);

  return {
    status: true,
    reports: response.data.data,
  };
}

// Get Banner Login
export async function getBannerLogin() {
  const response = await axios.get(`${URL_BACKEND}/view/banner-login`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.status) {
    console.log("[getBannerLogin-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getBannerLogin-success]: ", response.data);

  return {
    status: true,
    data: response.data.data,
  };
}
