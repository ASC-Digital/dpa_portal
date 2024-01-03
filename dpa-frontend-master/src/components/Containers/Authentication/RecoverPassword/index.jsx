/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import InputText from "@/components/Presentational/Inputs/Text";
import Button from "@/components/Presentational/Buttons/Default";
import { authRecoverPassword } from "@/services/Authentication";
import { toastrMessage } from "@/utils/Toastr";
import { useLoader } from "@/contexts/Loader";

const schema = yup.object({
  password: yup.string().required("Informe sua senha"),
  newPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirme sua senha"),
});

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ForgotPassword = () => {
  let query = useQuery();
  let navigate = useNavigate();
  const { setLoader } = useLoader();
  const [token, setToken] = useState("");

  const onSubmit = async (body) => {
    setLoader(true);

    const authRecoverPasswordResponse = await authRecoverPassword(
      body.newPassword,
      token
    );

    if (!authRecoverPasswordResponse.status) {
      setLoader(false);
      toastrMessage("error", authRecoverPasswordResponse.message);
      return;
    }

    setLoader(false);
    toastrMessage("success", authRecoverPasswordResponse.message);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    if (!query.get("t")) {
      navigate("/login");
      return;
    }

    setToken(query.get("t"));
  }, []);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={onSubmit}
      initialValues={{
        password: "",
        newPassword: "",
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <form onSubmit={handleSubmit}>
          <InputText
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Digite sua nova senha"
            required
          >
            <code>{errors.password}</code>
          </InputText>
          <InputText
            type="password"
            name="newPassword"
            value={values.newPassword}
            id="newPassword"
            onChange={handleChange}
            placeholder="Confirme sua senha"
            required
          >
            <code>{errors.newPassword}</code>
          </InputText>

          <Button type="submit" title="Alterar senha" block />
        </form>
      )}
    </Formik>
  );
};

export default ForgotPassword;
