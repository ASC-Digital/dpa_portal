import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/Authentication";
import { LoaderProvider } from "@/contexts/Loader";
import PrivateRoute from "./PrivateRoute";

import Login from "@/pages/Login";
import Home from "@/pages/Home";
import PEX from "@/pages/PEX";
import Training from "@/pages/Training";
import ForgotPassword from "@/pages/ForgotPassword";
import RecoverPassword from "@/pages/RecoverPassword";
import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Awards from "@/pages/Awards";
import Products from "@/pages/Products";
import Transactions from "@/pages/Transactions";
import Profile from "@/pages/Profile";
import Distributors from "@/pages/Distributors";
import Branches from "@/pages/Branches";
import Clusters from "@/pages/Clusters";
import Reports from "@/pages/Reports";
import Banners from "@/pages/Banners";
import Configs from "@/pages/Configs";
import Roles from "@/pages/Roles";
import AccessControl from "@/pages/AccessControl";
import { FeedsContainer } from "@/components/Containers/Feed";
import AdvertisingMaterials from "@/pages/AdvertisingMaterial";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoaderProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/recover-password" element={<RecoverPassword />} />

            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/pex" element={<PEX />} />
              <Route path="/training" element={<Training />} />
              <Route path="/gifts/dashboard" element={<Dashboard />} />
              <Route path="/gifts/users" element={<Users />} />
              <Route path="/gifts/access_control" element={<AccessControl />} />
              <Route path="/gifts/awards" element={<Awards />} />
              <Route path="/gifts/products" element={<Products />} />
              <Route path="/gifts/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/feed" element={<FeedsContainer />} />
              <Route
                path="/gifts/advertisingMaterials"
                element={<AdvertisingMaterials />}
              />
              <Route path="/gifts/distributors" element={<Distributors />} />
              <Route path="/gifts/branches" element={<Branches />} />
              <Route path="/gifts/clusters" element={<Clusters />} />
              <Route path="/gifts/reports" element={<Reports />} />
              <Route path="/gifts/banners" element={<Banners />} />
              <Route path="/gifts/configs" element={<Configs />} />
            </Route>
            <Route exact path="*" element={<Login />} />
          </Routes>
        </LoaderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
