import React, { useState } from "react";
import { useAuth } from "@/contexts/Authentication";
import InputText from "@/components/Presentational/Inputs/Text";
import Button from "@/components/Presentational/Buttons/Default";
import { auth } from "@/services/Authentication";
import { getUserProfile } from "@/services/Profile";
import useProfile from "@/hooks/useProfile";
import { toastrMessage } from "@/utils/Toastr";
import { useLoader } from "@/contexts/Loader";

const FORM_DATA = {
  email: "",
  password: "",
};

const Login = () => {
  const { signIn } = useAuth();
  const { setLoader } = useLoader();
  const [password, setPassword] = useState(false);
  const [formData, setFormData] = useState(FORM_DATA);
  const { getProfileWallet } = useProfile();

  const onChange = (e) => {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const authResponse = await auth(formData.email, formData.password);

    if (!authResponse.status) {
      setLoader(false);
      toastrMessage("error", authResponse.message);
      return;
    }

    const profileResponse = await getUserProfile(authResponse.token);

    if (!profileResponse.status) {
      setLoader(false);
      toastrMessage("error", profileResponse.message);
      return;
    }

    const getUserWalletResponse = await getProfileWallet(authResponse.token);

    signIn({
      token: authResponse.token,
      name: authResponse.name,
      email: formData.email,
      phoneNumber: profileResponse.profileUser.phoneNumber,
      document: profileResponse.profileUser.document,
      photoUrl: profileResponse.profileUser.photoUrl,
      roleId: profileResponse.profileUser.roleId,
      balance: getUserWalletResponse.balance,
      permissions: authResponse.permissions,
      userId: authResponse?.userId,
      fullName: authResponse?.fullName
    });

    setTimeout(() => {
      setLoader(false);
    }, 2200);
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

      <div className="input-group mb-3">
        <input
          type={password ? "text" : "password"}
          className="form-control"
          name="password"
          id="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Digite seu senha"
          required
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={() => setPassword(!password)}
          >
            {!password ? (
              <i className="fa fa-eye-slash" />
            ) : (
              <i className="fa fa-eye" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" title="Login" block />
    </form>
  );
};

export default Login;
