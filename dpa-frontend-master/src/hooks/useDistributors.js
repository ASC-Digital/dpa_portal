import {
  getDistributors,
  sendDistributors,
  updateDistributors,
  deleteDistributors,
  disabledDistributors,
  activeDistributors,
} from "@/services/Distributors";
import { toastrMessage } from "@/utils/Toastr";
import { validatorCNPJ } from "@/utils/Validator/CNPJ";

export default function useDistributors() {
  async function getData() {
    const response = await getDistributors();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.distributors.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const validatorCNPJResponse = validatorCNPJ(data.cnpj);

    if (!validatorCNPJResponse.status) {
      toastrMessage("error", validatorCNPJResponse.message);
      return;
    }

    data.cnpj = Number(validatorCNPJResponse.cnpj);
    data.clusterId = Number(data.clusterId);
    data.companyBranchId = Number(data.companyBranchId);

    const response = await sendDistributors(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Distribuidor registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateDistributors(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Distribuidor alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteDistributors(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Distribuidor removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledDistributors(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Distribuidor desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeDistributors(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Distribuidor ativado com sucesso!");
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
