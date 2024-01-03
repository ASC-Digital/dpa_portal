import React from "react";
import Select from "@/components/Presentational/Inputs/Select";

const SelectPages = ({ name, id, value, onChange, required, disabled }) => {
  return (
    <Select
      name={name}
      id={id}
      value={value}
      options={[
        { id: 1, label: "Login", value: "login" },
        { id: 2, label: "Home", value: "home" },
      ]}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
};

export default SelectPages;
