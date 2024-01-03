import {
  getProducts,
  sendProducts,
  updateProducts,
  deleteProducts,
  buyProducts,
} from "@/services/Products";
import { toastrMessage } from "@/utils/Toastr";

export default function useProducts() {
  async function getData(queryString) {
    let params = "";

    if (queryString) {
      params = queryString;
    }

    const response = await getProducts(params);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    return response.products.sort((a, b) => b.id - a.id);
  }

  async function insertData(data) {
    const response = await sendProducts(data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Produto registrado com sucesso!");
  }

  async function updateData(id, data) {
    const response = await updateProducts(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Produto alterado com sucesso!");
  }

  async function removeData(id) {
    const response = await deleteProducts(id);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Produto removido com sucesso!");
  }

  async function buyData(id, data) {
    const response = await buyProducts(id, data);

    if (!response.status) {
      toastrMessage("error", response.message);
      return;
    }

    toastrMessage("success", "Compra efetuada com sucesso!");
  }

  return { getData, insertData, updateData, removeData, buyData };
}
