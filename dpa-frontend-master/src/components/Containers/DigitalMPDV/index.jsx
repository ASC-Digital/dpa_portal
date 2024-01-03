import React from "react";
import Select from "@/components/Presentational/Inputs/Select";

const SelectDigitalMPDV = ({ name, id, value, onChange, required, disabled }) => {
    return (
        <Select
            name={name}
            id={id}
            value={value}
            options={[
                { id: 1, label: "Sim", value: true },
                { id: 2, label: "Não", value: false },
            ]}
            onChange={onChange}
            required={required}
            disabled={disabled}
        />
    );
};

export default SelectDigitalMPDV;
