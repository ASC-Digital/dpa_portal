import React, { useRef } from "react";

const UploadButton = ({
  label = "",
  icon = "",
  name = "upload",
  onChange = () => {},
  color = "primary",
}) => {
  const ref = useRef();

  return (
    <label className={`btn btn-icon-split btn-${color} btn-user`}>
      <span className="icon text-white-50">
        <i className={`fas fa-${icon}`}></i>
      </span>
      <div style={{ margin: "6px 10px 0" }}>{label}</div>{" "}
      <input
        type="file"
        name={name}
        hidden
        id="upload"
        ref={ref}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={onChange}
        onClick={(event) => {
          event.target.value = null;
        }}
      />
    </label>
  );
};

export default UploadButton;
