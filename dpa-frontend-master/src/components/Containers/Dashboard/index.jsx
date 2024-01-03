/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useDashboard from "@/hooks/useDashboard";
import useProfile from "@/hooks/useProfile";
import { getToken } from "@/utils/Token";
import DashboardMe from "./partials/DashboardMe";
import DashboardFull from "./partials/DashboardFull";

const DATA = {
  totalProducts: 0,
  totalTransactionsReceived: 0,
  totalTransactionsSpent: 0,
  totalUsers: 0,
  totalDistributors: 0,
  topUsersByCreatedAt: [],
  topTransactionsSpent: [],
  topTransactionsReceived: [],
  topProductsByStock: [],
  topAwardsByRelated: [],
};

const DashboardContainers = () => {
  const { getData } = useDashboard();
  const { getProfileDashboard } = useProfile();
  const [spinner, setSpinner] = useState(true);
  const [data, setData] = useState(DATA);
  const [dashboardMe, setDashboardMe] = useState(true);

  const listData = async () => {
    const response = await getData();
    setData(response);
    setSpinner(false);
  };

  const listDataUser = async () => {
    const response = await getProfileDashboard();
    setData(response);
    setSpinner(false);
  };

  useEffect(() => {
    const permissions = getToken("permissions");

    if (permissions.includes("dashboard-read")) {
      setDashboardMe(false);
      listData();
      return;
    }

    listDataUser();
  }, []);

  if (dashboardMe) {
    return (
      <DashboardMe
        spinner={spinner}
        totalProducts={data.totalProducts}
        totalTransactionsReceived={data.totalTransactionsReceived}
        totalTransactionsSpent={data.totalTransactionsSpent}
        topTransactionsReceived={data.topTransactionsReceived}
        topAwardsByRelated={data.topAwardsByRelated}
        topTransactionsSpent={data.topTransactionsSpent}
      />
    );
  }

  return (
    <DashboardFull
      spinner={spinner}
      totalUsers={data.totalUsers}
      totalProducts={data.totalProducts}
      totalDistributors={data.totalDistributors}
      totalTransactionsReceived={data.totalTransactionsReceived}
      totalTransactionsSpent={data.totalTransactionsSpent}
      topUsersByCreatedAt={data.topUsersByCreatedAt}
      topTransactionsSpent={data.topTransactionsSpent}
      topTransactionsReceived={data.topTransactionsReceived}
      topProductsByStock={data.topProductsByStock}
      topAwardsByRelated={data.topAwardsByRelated}
      totalDistributorsByCluster={data.totalDistributorsByCluster}
    />
  );
};

export default DashboardContainers;
