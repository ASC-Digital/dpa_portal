import {
  getUsers,
  sendUsers,
  updateUsers,
  deleteUsers,
  disabledUsers,
  activeUsers,
} from "@/services/Users";
import { toastrMessage } from "@/utils/Toastr";

export default function useUsers() {
  async function getData() {
    const response = await getUsers();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.users.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendUsers(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateUsers(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteUsers(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledUsers(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeUsers(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário ativado com sucesso!");
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
