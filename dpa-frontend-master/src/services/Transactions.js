import { request } from "./Axios";
import { translateMessage } from "@/utils/Translator";

// Get Transactions
export async function getTransactions() {
  const response = await request({
    endpoint: `/api/transactions`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[getTransactions-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[getTransactions-success]: ", response.data);

  return {
    status: true,
    transactions: response.data.data,
  };
}

// Get Transactions by id
export async function readTransactions(id) {
  const response = await request({
    endpoint: `/api/transactions/${id}`,
    method: "GET",
  });

  if (!response.status) {
    console.log("[readTransactions-error]: ", response.message);
    return { status: false, message: translateMessage(response.message) };
  }

  console.log("[readTransactions-success]: ", response.data);

  return {
    status: true,
    transactions: response.data.data,
  };
}
