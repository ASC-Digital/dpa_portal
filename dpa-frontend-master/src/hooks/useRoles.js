import {
  getRoles,
  sendRoles,
  updateRoles,
  deleteRoles,
  disabledRoles,
  activeRoles,
} from "@/services/Roles";
import { toastrMessage } from "@/utils/Toastr";

export default function useRoles() {
  async function getData(queryString) {
    let params = "";

    if (queryString) {
      params = queryString;
    }

    const response = await getRoles(params);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.roles.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendRoles(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Perfil registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateRoles(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Perfil alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteRoles(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Perfil removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledRoles(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Perfil desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeRoles(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Perfil ativado com sucesso!");
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
