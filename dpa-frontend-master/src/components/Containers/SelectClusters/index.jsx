/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "@/components/Presentational/Inputs/Select";
import useClusters from "@/hooks/useClusters";

const SelectClusters = ({ onChange, value, name, required }) => {
  const { getData } = useClusters();
  const [clusters, setClusters] = useState([]);

  const listClusters = async () => {
    const getDataResponse = await getData();

    const data = [];

    getDataResponse.map((state) =>
      data.push({
        label: state.name,
        value: state.id,
      })
    );

    setClusters(data);
  };

  useEffect(() => {
    listClusters();
  }, []);

  return (
    <Select
      value={value}
      name={name}
      options={clusters}
      placeholder="Selecione uma classificação"
      onChange={onChange}
      required={required}
    />
  );
};

export default SelectClusters;
