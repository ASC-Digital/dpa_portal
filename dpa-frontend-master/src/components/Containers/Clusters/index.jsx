/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useClusters from "@/hooks/useClusters";
import { useAuth } from "@/contexts/Authentication";

const FORM_DATA = {
  name: "",
};

const TYPE = {
  title: "",
  action: "",
};

const ClustersContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useClusters();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [data, setData] = useState([]);
  const [type, setType] = useState(TYPE);

  const {
    user: { permissions },
  } = useAuth();

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addProduct = async (data) => {
    await insertData(data);
    await listData();
  };

  const editProduct = async () => {
    await updateData(formData.id, formData);
    setFormData(FORM_DATA);
    await listData();
    return;
  };

  const listData = async () => {
    const response = await getData();
    setData(response);
    setSpinner(false);
    setModal(false);
  };

  const statusData = async (row) => {
    if (row.deletedAt) {
      await activeData(row.id);
    } else {
      await disabledData(row.id);
    }

    await listData();
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
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <>
      <DataTable
        data={data}
        columns={COLUMNS}
        loader={spinner}
        filters={FILTERS}
        exports={EXPORTS}
        buttonAdd={permissions.includes("clusters-create")}
        buttonEdit={permissions.includes("clusters-update")}
        buttonExport={permissions.includes("clusters-export")}
        buttonStatus={permissions.includes("clusters-active")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar Classificação",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          setFormData(row);
          setType({
            title: "Editar Classificação",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir Classificação",
            action: "delete",
          });
          setModalAlert(!modalAlert);
        }}
        onClickStatus={statusData}
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
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={() => {
          setFormData(FORM_DATA);
          setModal(false);
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

export default ClustersContainers;
