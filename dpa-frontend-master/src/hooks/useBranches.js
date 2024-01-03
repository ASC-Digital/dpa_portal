import {
  getBranches,
  sendBranches,
  updateBranches,
  deleteBranches,
  disabledBranches,
  activeBranches,
} from "@/services/Branches";
import { toastrMessage } from "@/utils/Toastr";

export default function useBranches() {
  async function getData() {
    const response = await getBranches();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.branches.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendBranches(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Filial registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateBranches(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Filial alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteBranches(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Filial removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledBranches(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Filial desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeBranches(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Filial ativado com sucesso!");
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
