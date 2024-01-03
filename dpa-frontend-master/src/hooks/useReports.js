import {
  getReports,
  sendReports,
  updateReports,
  deleteReports,
  disabledReports,
  activeReports,
} from "@/services/Reports";
import { toastrMessage } from "@/utils/Toastr";

export default function useReports() {
  async function getData() {
    const response = await getReports();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.reports.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendReports(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Relatório registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateReports(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Relatório alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteReports(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Relatório removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledReports(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Relatório desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeReports(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Relatório ativado com sucesso!");
  }

  return {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  };
}
