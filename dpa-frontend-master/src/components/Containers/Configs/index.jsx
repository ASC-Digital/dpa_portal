/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useConfigs from "@/hooks/useConfigs";
import { useAuth } from "@/contexts/Authentication";
import useStorage from "@/hooks/useStorage";

const FORM_DATA = {
  name: "",
  text: "",
  order: "",
  imageUrl: "",
  link: "",
};

const TYPE = {
  title: "",
  action: "",
};

const ConfigsContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useConfigs();
  const { uploadData } = useStorage();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [selectedFile, setSelectedFile] = useState();

  const [data, setData] = useState([]);
  const [type, setType] = useState(TYPE);

  const {
    user: { permissions },
  } = useAuth();

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addData = async (data) => {
    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);

      if (data.name === "link-rapido") {
        data.link = uploadDataResponse;
        data.imageUrl = null;
      } else {
        data.imageUrl = uploadDataResponse;
      }
    }

    if (data.order === "") {
      data.order = null;
    }

    await insertData(data);
    await listData();
  };

  const editData = async () => {
    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);

      if (formData.name === "link-rapido") {
        formData.link = uploadDataResponse;
        formData.imageUrl = null;
      } else {
        formData.imageUrl = uploadDataResponse;
      }
    }

    if (formData.order === "") {
      formData.order = null;
    }

    await updateData(formData.id, formData);
    setFormData(FORM_DATA);
    await listData();
    return;
  };

  const listData = async () => {
    const response = await getData();

    response.map(d => {
      switch(d.name) {
        case "link-rapido": d.gridName = "Link Rápido"; break;
        case "rede-social": d.gridName = "Rede Social"; break;
        default: d.gridName = d.name;;
      }
      return d;
    });

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

    formData.title = formData.text;

    delete formData.text;

    if (type.action === "add") {
      addData(formData);
      return;
    }

    if (type.action === "edit") {
      editData(formData);
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
        buttonAdd={permissions.includes("configs-create")}
        buttonEdit={permissions.includes("configs-update")}
        buttonExport={permissions.includes("configs-export")}
        buttonStatus={permissions.includes("configs-active")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar Configuração",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          row.text = row.title;
          setFormData(row);
          setType({
            title: "Editar Configuração",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir Configuração",
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
        text={formData.text}
        order={formData.order}
        imageUrl={formData.imageUrl}
        link={formData.link}
        required={type.action === "edit" ? false : true}
        onChangeFile={onChangeFile}
        onChange={onChange}
        onSubmit={onSubmit}
        onClose={() => {
          setFormData(FORM_DATA);
          setModal(false);
        }}
      />
      <ModalDelete
        title={type.title}
        value={formData.page}
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

export default ConfigsContainers;
