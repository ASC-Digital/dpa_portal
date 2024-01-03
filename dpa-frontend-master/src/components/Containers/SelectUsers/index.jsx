/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useUsers from "@/hooks/useUsers";

const SelectUsers = ({ onChange, name, value, required }) => {
  const { getData } = useUsers();
  const [users, setUsers] = useState([]);

  const listusers = async () => {
    const getDataResponse = await getData();

    const data = [];

    getDataResponse.map((state) =>
      data.push({
        label: state.name,
        value: state.id,
      })
    );

    setUsers(
      data.sort((a, b) => {
        return a.label > b.label ? 1 : b.label > a.label ? -1 : 0;
      })
    );
  };

  useEffect(() => {
    listusers();
  }, []);

  return (
    <div className="form-group">
      <select
        onChange={onChange}
        name={name}
        value={value}
        className="form-control mb-1"
        required={required}
      >
        <option value="">Selecione um usuário...</option>
        {users.map((row, key) => (
          <option key={key} value={row.value}>
            {row.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUsers;
