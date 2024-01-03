import {
  getAwards,
  updateAwards,
  uploadAwards,
  deleteAwards,
} from "@/services/Awards";
import { toastrMessage } from "@/utils/Toastr";

export default function useAwards() {
  async function getData() {
    const response = await getAwards();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.awards.sort((a, b) => b.id - a.id);
  }

  async function updateData(id, data) {
    const body = {
      name: data.name,
      expected: data.expected,
      accomplished: data.accomplished,
      related: data.related,
      profit: data.profit,
    };

    const response = await updateAwards(id, body);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Meta alterada com sucesso!");
  }

  async function uploadData(file) {
    let data = new FormData();
    data.append("file", file);

    const response = await uploadAwards(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Premios importados com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteAwards(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Usuário removido com sucesso!");
  }

  return { getData, updateData, removeData, uploadData };
}
