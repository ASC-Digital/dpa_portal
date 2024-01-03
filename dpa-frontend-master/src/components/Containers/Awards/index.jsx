/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDetails from "@/components/Presentational/ModalDetails";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useAwards from "@/hooks/useAwards";
import useProfile from "@/hooks/useProfile";
import { useAuth } from "@/contexts/Authentication";
import { maskDate } from "@/utils/Mask/Date";

const FORM_DATA = {
  name: "",
  expected: "",
  accomplished: "",
  related: "",
  profit: "",
};

const TYPE = {
  title: "",
  action: "",
};

const AwardsContainers = () => {
  const { getData, uploadData, updateData, removeData } = useAwards();
  const { updateWallet } = useProfile();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalDetails, setModalDetails] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [type, setType] = useState(TYPE);
  const [awards, setAwards] = useState([]);
  const [award, setAward] = useState({});
  const {
    user: { permissions },
  } = useAuth();

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const listData = async () => {
    setSpinner(true);
    const awards = await getData();
    setAwards(awards);
    setSpinner(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type.action === "edit") {
      await updateData(formData.id, formData);
      updateWallet();
      setModal(false);
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
        data={awards}
        columns={COLUMNS}
        loader={spinner}
        buttonAdd={false}
        filters={FILTERS}
        exports={EXPORTS}
        buttonEdit={permissions.includes("awards-update")}
        buttonRemove={permissions.includes("awards-delete")}
        buttonBuy={false}
        buttonActions={true}
        buttonDetails={permissions.includes("awards-read")}
        buttonUpload={permissions.includes("awards-import")}
        buttonExport={permissions.includes("awards-export")}
        onClickDetails={(row) => {
          console.log("row", row);
          setAward(row);
          setModalDetails(true);
        }}
        onClickUpload={(e) => {
          uploadData(e.target.files[0]);
          listData();
        }}
        onClickEdit={(row) => {
          console.log("row", row);
          setFormData(row);
          setType({
            title: "Editar meta",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir meta",
            action: "delete",
          });
          setModalAlert(!modalAlert);
        }}
      />
      <ModalForm
        title={type.title}
        actions={type.action}
        modal={modal}
        name={formData.name}
        expected={formData.expected}
        accomplished={formData.accomplished}
        related={formData.related}
        profit={formData.profit}
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
          updateWallet();
          await listData();
          setModalAlert(false);
        }}
        onClose={() => setModalAlert(false)}
      />
      <ModalDetails
        title={"Detalhes das Metas"}
        modal={modalDetails}
        onClick={async () => {
          setModalDetails(false);
        }}
        onClose={() => setModalDetails(false)}
      >
        <p>Nome: {award.name}</p>
        <p>Esperada: {award.expected}</p>
        <p>Feita: {award.accomplished}</p>
        <p>Valor: {award.profit}p</p>
        <p>Competência: {award.related}</p>
        <p>Criado em: {maskDate(award.createdAt)}</p>
        <p>Descrição: {award.description}</p>
      </ModalDetails>
    </>
  );
};

export default AwardsContainers;
