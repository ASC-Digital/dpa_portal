import React, { useEffect, useRef } from "react";
import { Avatar } from "../../avatar";

export const CommentInput = ({
  currentUser,
  value,
  setValue,
  handleCreateComment,
}) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    handleCreateComment();
  };

  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  return (
    <div
      className="d-flex align-items-center shadowAdded"
      style={{
        height: 100,
        position: "absolute",
        backgroundColor: "white",
        width: "100%",
        borderRadius: "0px 0px 15px 15px",
        padding: 23,
      }}
    >
      <Avatar photoUrl={currentUser?.photoUrl} />
      <form style={{ width: "100%" }}>
        <input
          type="text"
          className="ml-2"
          placeholder="Comente..."
          style={{
            backgroundColor: "#f0f0f4",
            width: "95%",
            border: "none",
            outline: "none",
            height: 50,
            borderRadius: 15,
            padding: 10,
          }}
          value={value}
          onChange={(e) => setValue(e?.target?.value)}
          ref={inputReference}
        />
        <button className="btn" onClick={handleSubmit} type={"submit"}>
          <i
            class="far fa-paper-plane fa-1x"
            style={{ color: "rgb(21, 132, 179)" }}
          />
        </button>
      </form>
    </div>
  );
};
