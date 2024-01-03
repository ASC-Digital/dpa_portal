/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useUsers from "@/hooks/useUsers";
import useStorage from "@/hooks/useStorage";
import { validatorCPF } from "@/utils/Validator/CPF";
import { validatorPhoneNumber } from "@/utils/Validator/PhoneNumber";
import { toastrMessage } from "@/utils/Toastr";
import { useAuth } from "@/contexts/Authentication";

const FORM_DATA = {
  name: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  document: "",
  password: "",
  roleId: "",
  distributors: "",
};

const TYPE = {
  title: "",
  action: "",
};

const UsersContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useUsers();
  const { uploadData } = useStorage();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState(TYPE);
  const [selectedFile, setSelectedFile] = useState();
  const {
    user: { permissions, roleId },
  } = useAuth();

  const listData = async () => {
    const response = await getData();
    setUsers(response);
    setSpinner(false);
    setModal(false);
    setSelectedFile();
  };

  const statusData = async (row) => {
    if (row.deletedAt) {
      await activeData(row.id);
    } else {
      await disabledData(row.id);
    }

    await listData();
  };

  const addUser = async (data) => {
    if (data.document) {
      const validateCPF = validatorCPF(data.document);

      if (!validateCPF.status) {
        toastrMessage("error", validateCPF.message);
        return;
      }
      data.document = validateCPF.cpf;
    }

    if (data.phoneNumber) {
      const validatePhone = validatorPhoneNumber(data.phoneNumber);

      if (!validatePhone.status) {
        toastrMessage("error", validatePhone.message);
        return;
      }
      data.phoneNumber = validatePhone.phone;
    }

    delete data.phoneNumber;
    delete data.document;
    data.distributorsId = data.distributors;

    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);
      data.photoUrl = uploadDataResponse;
    }

    await insertData(data);
    await listData();
  };

  const editUser = async (data) => {
    if (data.document) {
      const validateCPF = validatorCPF(data.document);

      if (!validateCPF.status) {
        toastrMessage("error", validateCPF.message);
        return;
      }
      data.document = validateCPF.cpf;
    }

    if (data.phoneNumber) {
      const validatePhone = validatorPhoneNumber(data.phoneNumber);

      if (!validatePhone.status) {
        toastrMessage("error", validatePhone.message);
        return;
      }
      data.phoneNumber = validatePhone.phone;
    }

    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);
      data.photoUrl = uploadDataResponse;
    }

    if (data.phoneNumber === null) {
      data.phoneNumber = null;
    }

    if (data.document === null) {
      data.document = null;
    }

    data.distributorsId = data.distributors;

    await updateData(formData.id, formData);
    await listData();
  };

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onChangeDistributors = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value)
    );
    setFormData((data) => ({
      ...data,
      [e.target.name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (type.action === "add") {
      addUser(formData);
      return;
    }

    editUser(formData);
  };

  useEffect(() => {
    listData();
  }, []);

  const usersMemoized = useMemo(
    () =>
      users?.map((user) => ({
        ...user,
        status: !user?.deletedAt ? "Ativo" : "Inativo",
      })),
    [users]
  );

  return (
    <>
      <DataTable
        data={usersMemoized}
        columns={COLUMNS}
        loader={spinner}
        filters={FILTERS}
        exports={EXPORTS}
        buttonAdd={permissions.includes("users-create")}
        buttonEdit={permissions.includes("users-update")}
        buttonStatus={permissions.includes("users-active")}
        buttonExport={permissions.includes("users-export")}
        buttonRemove={false}
        onClickAdd={() => {
          setFormData(FORM_DATA);
          setType({
            title: "Adicionar usuário",
            action: "add",
          });
          setModal(!modal);
        }}
        onClickEdit={(row) => {
          row.password = "";
          row.distributors = row.distributors.map(
            (distributor) => distributor.id
          );
          setFormData(row);
          setType({
            title: "Editar usuário",
            action: "edit",
          });
          setModal(!modal);
        }}
        onClickRemove={(row) => {
          setFormData(row);
          setType({
            title: "Excluir usuário",
            action: "delete",
          });
          setModalAlert(!modalAlert);
        }}
        onClickStatus={statusData}
      />
      <ModalForm
        actualUserRoleId={roleId}
        title={type.title}
        actions={type.action}
        modal={modal}
        name={formData.name}
        fullName={formData.fullName}
        email={formData.email}
        document={formData.document}
        phoneNumber={formData.phoneNumber}
        roleId={formData.roleId}
        password={formData.password}
        distributors={formData.distributors}
        required={type.action === "edit" ? false : true}
        onChangeFile={onChangeFile}
        onChange={onChange}
        onChangeDistributors={onChangeDistributors}
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

export default UsersContainers;
