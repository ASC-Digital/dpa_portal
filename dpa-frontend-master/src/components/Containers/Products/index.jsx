/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import ModalSale from "./partials/ModalSale";
import { COLUMNS, FILTERS, EXPORTS, COLUMNS_PROFILE } from "./constants";
import useProducts from "@/hooks/useProducts";
import { useAuth } from "@/contexts/Authentication";
import useProfile from "@/hooks/useProfile";
import useStorage from "@/hooks/useStorage";

const FORM_DATA = {
  name: "",
  photoUrl: "",
  price: "",
  stock: "",
  description: "",
  amount: "",
};

const TYPE = {
  title: "",
  action: "",
};

const ProductsContainers = () => {
  const { getData, insertData, updateData, removeData, buyData } =
    useProducts();
  const { updateWallet } = useProfile();
  const { uploadData } = useStorage();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [modalSale, setModalSale] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [data, setData] = useState([]);
  const [type, setType] = useState(TYPE);
  const [selectedFile, setSelectedFile] = useState();
  const {
    user: { permissions },
  } = useAuth();

  const addProduct = async (data) => {
    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);
      data.photoUrl = uploadDataResponse;
    }

    if (data.description === null) {
      delete data.description;
    }

    await insertData(data);
    await listData();
  };

  const editProduct = async (data) => {
    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);
      data.photoUrl = uploadDataResponse;
    }

    if (data.description === null) {
      delete data.description;
    }

    await updateData(formData.id, formData);
    setModalSale(false);
    setFormData(FORM_DATA);
    await listData();
    return;
  };

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const listData = async () => {
    const response = await getData();
    setData(response);
    setSpinner(false);
    setModal(false);
    setSelectedFile();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type.action === "add") {
      addProduct(formData);
      return;
    }

    if (type.action === "edit") {
      editProduct(formData);
      return;
    }

    if (type.action === "sale") {
      await buyData(formData.id, { amount: parseInt(formData.amount) });
      updateWallet();
      setModalSale(false);
      setFormData(FORM_DATA);
      await listData();
      return;
    }
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <>
      <DataTable
        data={data}
        columns={
          permissions.includes("products-show-stock")
            ? COLUMNS
            : COLUMNS_PROFILE
        }
        loader={spinner}
        filters={FILTERS}
        exports={EXPORTS}
        buttonBuy={permissions.includes("products-buy")}
        buttonAdd={permissions.includes("products-create")}
        buttonEdit={permissions.includes("products-update")}
        buttonRemove={permissions.includes("products-delete")}
        buttonExport={permissions.includes("products-export")}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar produto",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          setFormData(row);
          setType({
            title: "Editar produto",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir produto",
            action: "delete",
          });
          setModalAlert(!modalAlert);
        }}
        onClickPurchase={(row) => {
          setFormData(row);
          setType({
            title: "Comprar produto",
            action: "sale",
          });
          setModalSale(!modalSale);
        }}
      />
      <ModalForm
        title={type.title}
        actions={type.action}
        modal={modal}
        name={formData.name}
        photoUrl={formData.photoUrl}
        price={formData.price}
        stock={formData.stock}
        description={formData.description}
        required={type.action === "edit" ? false : true}
        onChangeFile={onChangeFile}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={() => {
          setFormData(FORM_DATA);
          setModal(false);
        }}
      />
      <ModalSale
        title={type.title}
        actions={type.action}
        modal={modalSale}
        amount={formData.amount}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={() => {
          setFormData(FORM_DATA);
          setModalSale(false);
        }}
      />
      <ModalDelete
        title={type.title}
        value={formData.name}
        modal={modalAlert}
        onClick={async () => {
          await removeData(formData.id);
          await listData();
          setModalAlert(false);
        }}
        onClose={() => setModalAlert(false)}
      />
    </>
  );
};

export default ProductsContainers;
