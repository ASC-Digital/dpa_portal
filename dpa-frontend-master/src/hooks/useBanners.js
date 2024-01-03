import {
  getBanners,
  getViewBanners,
  sendBanners,
  updateBanners,
  deleteBanners,
  disabledBanners,
  activeBanners,
} from "@/services/Banners";
import { toastrMessage } from "@/utils/Toastr";

export default function useBanners() {
  async function getData(queryString) {
    let params = "";

    if (queryString) {
      params = queryString;
    }

    const response = await getBanners(params);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.banners.sort((a, b) => b.id - a.id);
  }

  async function listViewBanners() {
    const response = await getViewBanners();

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.banners.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendBanners(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Banner registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateBanners(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Banner alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteBanners(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Banner removido com sucesso!");
  }

  async function disabledData(id) {
    const response = await disabledBanners(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Banner desativado com sucesso!");
  }

  async function activeData(id) {
    const response = await activeBanners(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Banner ativado com sucesso!");
  }

  return {
    getData,
    listViewBanners,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  };
}
