/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useDistributors from "@/hooks/useDistributors";

const SelectDistributors = ({ onChange, name, value, required }) => {
  const { getData } = useDistributors();
  const [distributors, setDistributors] = useState([]);

  const listDistributors = async () => {
    const getDataResponse = await getData();

    const data = [];

    getDataResponse.map((state) =>
      data.push({
        label: state.name,
        value: state.id,
      })
    );

    setDistributors(
      data.sort((a, b) => {
        return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
      })
    );
  };

  useEffect(() => {
    listDistributors();
  }, []);

  return (
    <div className="form-group">
      <select
        multiple
        onChange={onChange}
        name={name}
        value={value}
        className="form-control mb-1"
        required={required}
      >
        {distributors.map((row, key) => (
          <option key={key} value={row.value}>
            {row.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDistributors;
