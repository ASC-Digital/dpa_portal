/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDelete from "@/components/Presentational/ModalDelete";
import ModalForm from "./partials/ModalForm";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useRoles from "@/hooks/useRoles";
import { useAuth } from "@/contexts/Authentication";
import { toastrMessage } from "@/utils/Toastr";

const FORM_DATA = {
  name: "",
  permissionsId: [],
};

const TYPE = {
  title: "",
  action: "",
};

const RolesContainers = () => {
  const {
    getData,
    insertData,
    updateData,
    removeData,
    activeData,
    disabledData,
  } = useRoles();
  const [spinner, setSpinner] = useState(true);
  const [display, setDisplay] = useState({
    list: true,
    crud: false,
  });
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [data, setData] = useState([]);
  const [type, setType] = useState(TYPE);
  const [perms, setPerms] = useState([]);

  const {
    user: { permissions },
  } = useAuth();

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangePermissions = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setPerms((data) => [...data, Number(value)]);
    } else {
      setPerms(
        perms.filter(function (item) {
          return Number(item) !== Number(value);
        })
      );
    }
  };

  const addData = async (data) => {
    const body = {
      name: data.name,
      permissionsId: data.permissionsId,
    };

    await insertData(body);
    setPerms([]);
    await listData();
  };

  const editData = async () => {
    const data = {
      name: formData.name,
      permissionsId: formData.permissionsId,
    };

    await updateData(formData.id, data);
    setFormData(FORM_DATA);
    setPerms([]);
    await listData();
    return;
  };

  const listData = async () => {
    const response = await getData();
    setData(response);
    setSpinner(false);
    setDisplay((data) => ({
      ...data,
      list: true,
      crud: false,
    }));
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

    formData.permissionsId = perms;

    if (perms.length === 0) {
      toastrMessage("error", "Insira pelo menos uma opção!");
      return;
    }

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
      {display.list && (
        <DataTable
          data={data}
          columns={COLUMNS}
          loader={spinner}
          filters={FILTERS}
          exports={EXPORTS}
          buttonAdd={permissions.includes("roles-create")}
          buttonEdit={permissions.includes("roles-update")}
          buttonExport={permissions.includes("roles-export")}
          buttonStatus={permissions.includes("roles-active")}
          buttonRemove={false}
          onClickAdd={() => {
            setFormData(FORM_DATA);
            setType({
              title: "Adicionar Perfil",
              action: "add",
            });
            setDisplay((data) => ({
              ...data,
              list: false,
              crud: true,
            }));
          }}
          onClickEdit={(row) => {
            setPerms(row.permissions.map((data) => data.id));
            setFormData(row);
            setType({
              title: "Editar Perfil",
              action: "edit",
            });
            setDisplay((data) => ({
              ...data,
              list: false,
              crud: true,
            }));
          }}
          onClickRemove={(row) => {
            setFormData(row);
            setType({
              title: "Excluir Perfil",
              action: "delete",
            });
            setModalAlert(!modalAlert);
          }}
          onClickStatus={statusData}
        />
      )}
      {display.crud && (
        <ModalForm
          title={type.title}
          actions={type.action}
          name={formData.name}
          items={formData.items}
          required={type.action === "edit" ? false : true}
          perms={perms}
          onChangePermissions={onChangePermissions}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={() => {
            setFormData(FORM_DATA);
            setDisplay((data) => ({
              ...data,
              list: true,
              crud: false,
            }));
          }}
        />
      )}
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

export default RolesContainers;
