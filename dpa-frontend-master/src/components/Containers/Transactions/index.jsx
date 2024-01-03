/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "@/components/Presentational/DataTable";
import ModalDetails from "@/components/Presentational/ModalDetails";
import { COLUMNS, FILTERS, EXPORTS } from "./constants";
import useTransactions from "@/hooks/useTransactions";
import useProfile from "@/hooks/useProfile";
import { useAuth } from "@/contexts/Authentication";
import { maskDate } from "@/utils/Mask/Date";

const DATA = {
  name: "",
  walletUserName: "",
  totalPrice: "",
  totalAmount: "",
  createdAt: "",
  description: "",
};

const TransactionsContainers = () => {
  const { getData, uploadData } = useTransactions();
  const { getProfileTransactions } = useProfile();
  const [spinner, setSpinner] = useState(true);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [award, setAward] = useState(DATA);
  const {
    user: { permissions, userId, roleId },
  } = useAuth();

  const listData = async () => {
    const response = await getData();
    setData(response);
    setSpinner(false);
  };

  const listDataUser = async () => {
    const response = await getProfileTransactions(userId);
    setData(response);
    setSpinner(false);
  };

  useEffect(() => {
    if ([1, 2]?.includes(roleId)) {
      listData();
      return;
    }

    listDataUser();
  }, [roleId]);

  return (
    <>
      <DataTable
        data={data}
        columns={COLUMNS}
        loader={spinner}
        buttonAdd={false}
        buttonEdit={false}
        buttonRemove={false}
        buttonBuy={false}
        buttonActions={true}
        buttonDetails={true}
        filters={FILTERS}
        exports={EXPORTS}
        buttonExport={permissions.includes("transactions-export")}
        onClickDetails={(row) => {
          setAward({
            name: row.name,
            walletUserName: row.wallet.user.name,
            totalPrice: row.totalPrice,
            totalAmount: row.totalAmount,
            createdAt: row.createdAt,
            description: row.description,
          });
          setModal(true);
        }}
        onClickUpload={(e) => {
          uploadData(e.target.files[0]);
        }}
      />
      <ModalDetails
        title={"Detalhes das Transações"}
        modal={modal}
        onClick={async () => {
          setModal(false);
        }}
        onClose={() => setModal(false)}
      >
        <p>Nome: {award.name}</p>
        <p>Usuário: {award.walletUserName}</p>
        <p>Valor: {award.totalPrice}</p>
        <p>Quantidade: {award.totalAmount}</p>
        <p>Criado em: {maskDate(award.createdAt)}</p>
        <p>Descrição: {award.description}</p>
      </ModalDetails>
    </>
  );
};

export default TransactionsContainers;
