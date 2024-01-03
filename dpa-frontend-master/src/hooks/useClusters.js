import {
  getClusters,
  sendClusters,
  updateClusters,
  deleteClusters,
  disabledClusters,
  activeClusters,
} from "@/services/Clusters";
import { toastrMessage } from "@/utils/Toastr";

export default function useClusters() {
  async function getData() {
    const response = await getClusters();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.clusters.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendClusters(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Classificação registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateClusters(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Classificação alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteClusters(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Classificação removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledClusters(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Classificação desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeClusters(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Classificação ativado com sucesso!");
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
