import React, { useState } from "react";
import InputText from "@/components/Presentational/Inputs/Text";
import Button from "@/components/Presentational/Buttons/Default";
import { authForgotPassword } from "@/services/Authentication";
import { toastrMessage } from "@/utils/Toastr";
import { useLoader } from "@/contexts/Loader";

const FORM_DATA = {
  email: "",
};

const ForgotPassword = () => {
  const { setLoader } = useLoader();
  const [formData, setFormData] = useState(FORM_DATA);

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const authForgotPasswordResponse = await authForgotPassword(formData.email);

    if (!authForgotPasswordResponse.status) {
      setLoader(false);
      toastrMessage("error", authForgotPasswordResponse.message);
      return;
    }

    setLoader(false);
    toastrMessage("success", authForgotPasswordResponse.message);
  };

  return (
    <form className="user was-validated" onSubmit={onSubmit}>
      <InputText
        type="text"
        name="email"
        id="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Digite seu email"
        required
      />

      <Button type="submit" title="Resetar senha" block />
    </form>
  );
};

export default ForgotPassword;
