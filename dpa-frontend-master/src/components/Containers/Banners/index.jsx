/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useBanners from "@/hooks/useBanners";
import { useAuth } from "@/contexts/Authentication";
import useStorage from "@/hooks/useStorage";

const FORM_DATA = {
  page: "",
  imageUrl: "",
  descriptionImageUrl: "",
  order: "",
  link: "",
  bannerDescription: "",
};

const TYPE = {
  title: "",
  action: "",
};

const BannersContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useBanners();
  const { uploadData } = useStorage();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [data, setData] = useState([]);
  const [type, setType] = useState(TYPE);

  const [imageFile, setImageFileFile] = useState();
  const [descriptionImageFile, setDescriptionImageFile] = useState();

  const {
    user: { permissions },
  } = useAuth();

  const onChangeImageFile = (event) => {
    setImageFileFile(event.target.files[0]);
  };

  const onChangeDescriptionImageFile = (event) => {
    setDescriptionImageFile(event.target.files[0]);
  };

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const addData = async (data) => {
    if (imageFile) {
      const uploadDataResponse = await uploadData(imageFile);
      data.imageUrl = uploadDataResponse;
    }

    if (descriptionImageFile) {
      const uploadDataResponse = await uploadData(descriptionImageFile);
      data.descriptionImageUrl = uploadDataResponse;
    }

    await insertData(data);
    await listData();
  };

  const editData = async (data) => {
    console.log("Edit data", data);

    if (imageFile) {
      const uploadDataResponse = await uploadData(imageFile);
      data.imageUrl = uploadDataResponse;
    }

    if (descriptionImageFile) {
      const uploadDataResponse = await uploadData(descriptionImageFile);
      data.descriptionImageUrl = uploadDataResponse;
    }

    await updateData(data.id, data);
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
        buttonAdd={permissions.includes("banners-create")}
        buttonEdit={permissions.includes("banners-update")}
        buttonExport={permissions.includes("banners-export")}
        buttonStatus={permissions.includes("banners-active")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar Banner",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          setFormData(row);
          setType({
            title: "Editar Banner",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir Banner",
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
        page={formData.page}
        imageUrl={formData.imageUrl}
        link={formData.link}
        bannerDescription={formData.bannerDescription}
        descriptionImageUrl={formData.descriptionImageUrl}
        order={formData.order}
        required={type.action === "edit" ? false : true}
        onChangeImageFile={onChangeImageFile}
        onChangeDescriptionImageFile={onChangeDescriptionImageFile}
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

export default BannersContainers;
