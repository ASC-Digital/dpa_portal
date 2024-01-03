/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useDistributors from "@/hooks/useDistributors";
import { useAuth } from "@/contexts/Authentication";

const FORM_DATA = {
  cnpj: "",
  companyBranchId: "",
  clusterId: "",
  soldTo: "",
  name: "",
  shortName: "",
  mainCity: "",
  uf: "",
};

const TYPE = {
  title: "",
  action: "",
};

const DistributorsContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useDistributors();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [distributors, setDistributors] = useState([]);
  const [type, setType] = useState(TYPE);

  const {
    user: { permissions },
  } = useAuth();

  const listData = async () => {
    const response = await getData();
    setDistributors(response);
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

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type.action === "add") {
      await insertData(formData);
      await listData();
      return;
    }

    await updateData(formData.id, formData);
    await listData();
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <>
      <DataTable
        data={distributors}
        columns={COLUMNS}
        loader={spinner}
        filters={FILTERS}
        exports={EXPORTS}
        buttonAdd={permissions.includes("distributors-create")}
        buttonEdit={permissions.includes("distributors-update")}
        buttonStatus={permissions.includes("distributors-active")}
        buttonExport={permissions.includes("distributors-export")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar distribuidor",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          row.password = "";
          setFormData(row);
          setType({
            title: "Editar distribuidor",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir distribuidor",
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
        cnpj={formData.cnpj}
        companyBranchId={formData.companyBranchId}
        clusterId={formData.clusterId}
        soldTo={formData.soldTo}
        shortName={formData.shortName}
        mainCity={formData.mainCity}
        uf={formData.uf}
        state={formData.state}
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

export default DistributorsContainers;
