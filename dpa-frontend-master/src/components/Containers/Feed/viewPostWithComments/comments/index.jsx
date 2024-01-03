import React from "react";
import { Avatar } from "../../avatar";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

export const CommentsBaloons = ({
  comment,
  handleDeleteComment,
  currentUser,
}) => {
  return (
    <div className="d-flex p-4">
      <Avatar photoUrl={comment?.user?.photoUrl} />
      <div
        style={{
          backgroundColor: "#f0f0f4",
          minWidth: 200,
          border: "none",
          outline: "none",
          height: "auto",
          borderRadius: 15,
          padding: 10,
          marginLeft: 10,
        }}
      >
        <b>{comment?.user?.name}</b>
        {comment?.createdAt?.length > 0 && (
          <div
            style={{ fontSize: 12, color: "black", fontFamily: "sans-serif" }}
          >
            {format(new Date(comment?.createdAt), "dd MMM yyyy", {
              locale: ptBR,
            })}{" "}
            às {format(new Date(comment?.createdAt), "HH:mm")}
          </div>
        )}

        <hr />

        <div className="mt-2">{comment?.content}</div>
      </div>
      {comment?.user?.userId === currentUser?.id && (
        <button
          className="btn"
          onClick={() => handleDeleteComment(comment?.id)}
        >
          x
        </button>
      )}
    </div>
  );
};
