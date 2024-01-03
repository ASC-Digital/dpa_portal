/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "@/components/Presentational/Loader";
import ModalDelete from "@/components/Presentational/ModalDelete";
import { useAuth } from "@/contexts/Authentication";
import useStorage from "@/hooks/useStorage";
import {
  activeAdvertisingMaterial,
  deleteAdvertisingMaterial,
  disableAdvertisingMaterial,
  getAdvertisingMaterial,
  registerDownload,
  sendAdvertisingMaterial,
  updateAdvertisingMaterial,
} from "@/services/AdvertisingMaterial";
import { toastrMessage } from "@/utils/Toastr";
import { useEffect, useState } from "react";
import { COLUMNS, EXPORTS, FILTERS } from "./constants";
import ModalForm from "./partials/ModalForm";
import DatatableMPDV from "@/components/Presentational/DataTableMPDV";

const FORM_DATA = {
  type: "",
  uploadedLink: "",
  description: "",
  link: "",
  thumbnail: "",
  typeOfMpdv: "",
  brand: "",
  digitalMPDV: false,
};

const TYPE = {
  title: "",
  action: "",
};

const AdvertisingMaterials = () => {
  const { uploadData } = useStorage();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [formDataDigital, setFormDataDigital] = useState(FORM_DATA);
  const [data, setData] = useState([]);
  const [dataDigital, setDataDigital] = useState([]);
  const [type, setType] = useState(TYPE);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFileFile] = useState();
  const [thumbnail, setThumbnail] = useState();

  const {
    user: { roleId, userId },
  } = useAuth();

  const onChangeImageFile = (event) => {
    setImageFileFile(event.target.files[0]);
  };

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,

      [e.target.name]: e.target.value,
    }));
  };

  const addData = async (data) => {
    try {
      setModal(false);
      setLoading(true);
      if (imageFile) {
        const uploadDataResponse = await uploadData(imageFile);
        data.uploadedUrl = uploadDataResponse;
      }
      if (thumbnail) {
        const uploadDataResponse = await uploadData(thumbnail);
        data.thumbnail = uploadDataResponse;
      }
      await sendAdvertisingMaterial(data);
      console.warn('DATA SEND MPDV',data);
    } catch (error) {
      toastrMessage("error", "Ocorreu um erro ao enviar o arquivo.");
    } finally {
      await listData();
      setLoading(false);
    }
  };

  const editData = async (data) => {
    try {
      setModal(false);
      setLoading(true);
      if (imageFile) {
        const uploadDataResponse = await uploadData(imageFile);
        data.uploadedUrl = uploadDataResponse;
      }

      if (thumbnail) {
        const uploadDataResponse = await uploadData(thumbnail);
        data.thumbnail = uploadDataResponse;
      }

      await updateAdvertisingMaterial(formData.id, data);
      setFormData(FORM_DATA);
    } catch (error) {
      toastrMessage("error", "Ocorreu um erro ao enviar o arquivo.");
    } finally {
      await listData();
      setLoading(false);
    }
  };

  const listData = async () => {
    const response = await getAdvertisingMaterial();

    setData(
      response?.advertisingMaterial?.map((item) => ({
        ...item,
        status: item?.deletedAt ? "Inativo" : "Ativo",
        downloadedBy: item?.downloadedAdvertisingMaterials
          ?.map((u) => u?.user?.name)
          ?.join(", "),
      }))
    );
    setDataDigital(
      response?.advertisingMaterial?.((item) => ({
        ...item
      }))
    );
    console.warn('data', dataDigital);
    setSpinner(false);
    setModal(false);
  };
/*
  TENTANDO FILTRAR O dataDigital PARA ENVIAR PARA A LISTA.

  const filterMPDV = async () => {
    dataDigital.forEach(d => {
      if (d.)
    })
  }
*/
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

  const statusData = async (row) => {
    if (row.deletedAt) {
      await activeAdvertisingMaterial(row.id);
    } else {
      await disableAdvertisingMaterial(row.id);
    }

    await listData();
  };

  const handleDownload = async (data) => {
    await registerDownload({ userId, advertisingMaterialId: data?.id });
    window.open(data?.uploadedUrl || data?.link);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <DatatableMPDV
          data={data}
          columns={COLUMNS}
          loader={spinner}
          filters={FILTERS}
          exports={EXPORTS}
          buttonAdd={[1, 2].includes(roleId)}
          buttonEdit={[1, 2].includes(roleId)}
          buttonStatus={[1, 2].includes(roleId)}
          onDownload={handleDownload}
          buttonDownload={true}
          buttonExport={[1, 2].includes(roleId)}
          buttonRemove={[1, 2].includes(roleId)}
          onClickStatus={statusData}
          onClickAdd={() => {
            setFormData(FORM_DATA);
            setType({
              title: "Adicionar Material",
              action: "add",
            });
            setModal(!modal);
          }}
          onClickEdit={(row) => {
            setFormData(row);
            setType({
              title: "Editar Material",
              action: "edit",
            });
            setModal(!modal);
          }}
          onClickRemove={(row) => {
            setFormData(row);
            setType({
              title: "Excluir Material",
              action: "delete",
            });
            setModalAlert(!modalAlert);
          }}
        />
      )}
      <ModalForm
        modal={modal}
        title={type.title}
        actions={type.action}
        type={formData.type}
        uploadedLink={formData.uploadedLink}
        thumbnail={formData.thumbnail}
        brand={formData.brand}
        typeOfMpdv={formData.typeOfMpdv}
        digitalMPDV={formData.digitalMPDV}
        link={formData.link}
        description={formData.description}
        required={type.action === "edit" ? false : true}
        onChangeImageFile={onChangeImageFile}
        onChange={onChange}
        onSubmit={onSubmit}
        setThumbnail={setThumbnail}
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
          await deleteAdvertisingMaterial(formData.id);
          await listData();
          setModalAlert(false);
        }}
        onClose={() => setModalAlert(false)}
      />
    </>
  );
};

export default AdvertisingMaterials;
