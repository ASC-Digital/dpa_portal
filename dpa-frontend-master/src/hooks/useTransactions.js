import { getTransactions, readTransactions } from "@/services/Transactions";
import { toastrMessage } from "@/utils/Toastr";

export default function useAwards() {
  async function getData() {
    const response = await getTransactions();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.transactions.sort((a, b) => b.id - a.id);
  }

  async function getDataById(id) {
    const response = await readTransactions(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.transactions;
  }

  return { getData, getDataById };
}
