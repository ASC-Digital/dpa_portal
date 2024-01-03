/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useReports from "@/hooks/useReports";
import { useAuth } from "@/contexts/Authentication";

const FORM_DATA = {
  userId: "",
  type: "",
  reportTitle: "",
  embeddedLink: "",
  format: "",
  powerbiGroupId: "",
  powerbiReportId: "",
};

const TYPE = {
  title: "",
  action: "",
};

const ReportsContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useReports();
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

  const addData = async (data) => {
    let body = "";

    if (data.format === "embedded") {
      body = {
        userId: data.userId,
        title: data.title,
        type: data.type,
        format: data.format,
        embeddedLink: data.embeddedLink,
      };
    }

    if (data.format === "powerbi") {
      body = {
        userId: data.userId,
        title: data.title,
        type: data.type,
        format: data.format,
        powerbiGroupId: data.powerbiGroupId,
        powerbiReportId: data.powerbiReportId,
      };
    }

    await insertData(body);
    await listData();
  };

  const editData = async () => {
    let body = "";

    if (formData.format === "embedded") {
      body = {
        userId: formData.userId,
        title: formData.title,
        type: formData.type,
        format: formData.format,
        embeddedLink: formData.embeddedLink,
      };
    }

    if (formData.format === "powerbi") {
      body = {
        userId: formData.userId,
        title: formData.title,
        type: formData.type,
        format: formData.format,
        powerbiGroupId: formData.powerbiGroupId,
        powerbiReportId: formData.powerbiReportId,
      };
    }

    await updateData(formData.id, body);
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

    formData.title = formData.reportTitle;
    delete formData.reportTitle;

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
        buttonAdd={permissions.includes("reports-create")}
        buttonEdit={permissions.includes("reports-update")}
        buttonExport={permissions.includes("reports-export")}
        buttonStatus={permissions.includes("reports-active")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar Relatório",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          row.reportTitle = row.title;

          setFormData(row);
          setType({
            title: "Editar Relatório",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir Relatório",
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
        format={formData.format}
        type={formData.type}
        userId={formData.userId}
        reportTitle={formData.reportTitle}
        embeddedLink={formData.embeddedLink}
        powerbiGroupId={formData.powerbiGroupId}
        powerbiReportId={formData.powerbiReportId}
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
        value={formData.type}
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

export default ReportsContainers;
