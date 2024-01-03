import {
  getSettings,
  getViewConfigs,
  sendSettings,
  updateSettings,
  deleteSettings,
  disabledSettings,
  activeSettings,
} from "@/services/Settings";
import { toastrMessage } from "@/utils/Toastr";

export default function useConfigs() {
  async function getData(queryString) {
    let params = "";

    if (queryString) {
      params = queryString;
    }

    const response = await getSettings(params);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.settings.sort((a, b) => b.id - a.id);
  }

  async function listViewConfigs() {
    const response = await getViewConfigs();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.configs.sort((a, b) => a.order - b.order);
  }

  async function insertData(data) {
    const response = await sendSettings(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Configuração registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateSettings(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Configuração alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteSettings(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Configuração removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledSettings(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Configuração desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeSettings(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Configuração ativado com sucesso!");
  }

  return {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
    listViewConfigs,
  };
}
