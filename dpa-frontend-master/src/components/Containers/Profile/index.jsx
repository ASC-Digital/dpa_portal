import React, { useState, useEffect } from "react";
import Form from "./partials/Form";
import ImageProfile from "./partials/ImageProfile";
import Details from "./partials/Details";
import { useAuth } from "@/contexts/Authentication";
import useProfile from "@/hooks/useProfile";
import useStorage from "@/hooks/useStorage";
import { validatorCPF } from "@/utils/Validator/CPF";
import { validatorPhoneNumber } from "@/utils/Validator/PhoneNumber";
import { toastrMessage } from "@/utils/Toastr";

const FORM_DATA = {
  name: "",
  email: "",
  phoneNumber: "",
  document: "",
  password: "",
  roleId: "",
  fullName: "",
};

const ProfileContainers = () => {
  const { updateProfile } = useProfile();
  const { uploadData } = useStorage();
  const { user } = useAuth();
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const [selectedFile, setSelectedFile] = useState();

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.document) {
      const validateCPF = validatorCPF(formData.document);

      if (!validateCPF.status) {
        toastrMessage("error", validateCPF.message);
        return;
      }
      formData.document = validateCPF.cpf;
    }

    if (formData.phoneNumber) {
      const validatePhone = validatorPhoneNumber(formData.phoneNumber);

      if (!validatePhone.status) {
        toastrMessage("error", validatePhone.message);
        return;
      }
      formData.phoneNumber = validatePhone.phone;
    }

    if (selectedFile) {
      const uploadDataResponse = await uploadData(selectedFile);
      formData.photoUrl = uploadDataResponse;
    }

    if (formData.phoneNumber === "") {
      formData.phoneNumber = null;
    }

    if (formData.document === "") {
      formData.document = null;
    }

    await updateProfile(formData);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        document: user.document,
        roleId: user.roleId,
        fullName: user.fullName,
      });
    }
  }, [user]);

  return (
    <div className="row">
      <ImageProfile />
      <Details>
        <Form
          modal={modal}
          name={formData.name}
          email={formData.email}
          document={formData.document}
          phoneNumber={formData.phoneNumber}
          password={formData.password}
          fullName={formData.fullName}
          actualUserRoleId={formData.roleId}
          onChangeFile={onChangeFile}
          onChange={onChange}
          onSubmit={onSubmit}
          onClose={() => {
            setModal(false);
          }}
        />
      </Details>
    </div>
  );
};

export default ProfileContainers;
