import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createToken, getToken, removeToken } from "@/utils/Token";
import { toastrMessage } from "@/utils/Toastr";
export const AuthContext = createContext({});

const PROFILE = {
  token: "",
  name: "",
  email: "",
  phoneNumber: "",
  document: "",
  photoUrl:
    "https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png",
  roleId: "",
  balance: 0,
  permissions: [],
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = async ({
    token,
    name,
    email,
    phoneNumber,
    document,
    photoUrl,
    roleId,
    balance,
    permissions,
    userId,
    fullName,
  }) => {
    const createTokenResponse = await createToken(
      token,
      name,
      email,
      phoneNumber,
      document,
      photoUrl ? photoUrl : PROFILE.photoUrl,
      roleId,
      balance,
      permissions,
      userId,
      fullName
    );

    if (!createTokenResponse) {
      toastrMessage(
        "error",
        "Ops, ocorreu um erro, por favor tente novamente."
      );
      return;
    }

    setUser({
      token: token,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      document: document,
      photoUrl: photoUrl ? photoUrl : PROFILE.photoUrl,
      roleId: roleId,
      balance: balance,
      permissions: permissions,
      userId,
    });

    setIsLoggedIn(true);

    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  const signOut = async () => {
    try {
      removeToken();
      navigate("/");
    } catch (error) {
      toastrMessage("Ops, ocorreu um erro, por favor tente novamente.");
      return;
    }
  };

  useEffect(() => {
    const getTokenResponse = getToken();

    if (getTokenResponse.status) {
      setIsLoggedIn(true);

      setUser({
        token: getTokenResponse.profile.token,
        name: getTokenResponse.profile.name,
        email: getTokenResponse.profile.email,
        phoneNumber: getTokenResponse.profile.phoneNumber,
        document: getTokenResponse.profile.document,
        photoUrl: getTokenResponse.profile.photoUrl,
        roleId: getTokenResponse.profile.roleId,
        balance: getTokenResponse.profile.balance,
        permissions: getTokenResponse.profile.permissions,
        userId: getTokenResponse.profile.userId,
        fullName: getTokenResponse.profile.fullName,
      });
      return;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isLoggedIn, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
