import React from "react";
import Select from "@/components/Presentational/Inputs/Select";

const SelectMaterialType = ({ name, id, value, onChange, required, disabled }) => {
    return (
        <Select
            name={name}
            id={id}
            value={value}
            options={[
                { id: 1, label: "Imagem", value: "image" },
                { id: 2, label: "Vídeo", value: "video" },
                { id: 3, label: "Documento", value: "document" },
            ]}
            onChange={onChange}
            required={required}
            disabled={disabled}
        />
    );
};

export default SelectMaterialType;
