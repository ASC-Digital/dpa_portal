import React from "react";

export const Input = ({ handleOpenCreatePostModal }) => {
  return (
    <div
      class="form-control ml-2"
      disabled={true}
      style={{
        borderRadius: 30,
        backgroundColor: "#f0f0f4",
        cursor: "pointer",
      }}
      onClick={handleOpenCreatePostModal}
    >
      No que você está pensando?
    </div>
  );
};
