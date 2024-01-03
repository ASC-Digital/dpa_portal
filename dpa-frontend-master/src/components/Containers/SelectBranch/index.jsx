/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "@/components/Presentational/Inputs/Select";
import useBranches from "@/hooks/useBranches";

const SelectBranch = ({ onChange, name, value, required }) => {
  const { getData } = useBranches();
  const [branches, setBranches] = useState([]);

  const listBranches = async () => {
    const getDataResponse = await getData();

    const data = [];

    getDataResponse.map((state) =>
      data.push({
        label: state.name,
        value: state.id,
      })
    );

    setBranches(data);
  };

  useEffect(() => {
    listBranches();
  }, []);

  return (
    <Select
      value={value}
      name={name}
      options={branches}
      placeholder="Selecione uma filial"
      onChange={onChange}
      required={required}
    />
  );
};

export default SelectBranch;
