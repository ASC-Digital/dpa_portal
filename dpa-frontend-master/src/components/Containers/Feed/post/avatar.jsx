/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
export const PostAvatar = ({
  user,
  photoUrl,
  name,
  email,
  createdAt,
  postId,
  handleDeletePost,
  post,
  handleEditPost,
}) => {
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        {isValidUrl(photoUrl) ? (
          <img
            src={photoUrl}
            alt="foto"
            style={{
              borderRadius: "100%",
              height: 50,
              width: 50,
            }}
          />
        ) : (
          <div
            style={{
              backgroundColor: "blue",
              textAlign: "center",
              color: "white",
              height: 40,
              width: 40,
              borderRadius: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>{name}</div>
          </div>
        )}

        <div className="ml-3 ">
          <div
            style={{
              color: "black",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            {name === user?.name ? "Você" : name}
          </div>
          {createdAt?.length > 0 && (
            <div
              style={{ fontSize: 14, color: "black", fontFamily: "sans-serif" }}
            >
              {format(new Date(createdAt), "dd MMM yyyy", { locale: ptBR })} às{" "}
              {format(new Date(createdAt), "HH:mm")}
            </div>
          )}
        </div>
      </div>
      {email === user?.email && (handleDeletePost || handleEditPost) && (
        <div>
          <button className="btn" onClick={() => handleDeletePost(postId)}>
            <i
              className="fas fa-trash fa-1x"
              style={{ color: "rgb(21, 132, 179)" }}
            />
          </button>
          <button className="btn" onClick={() => handleEditPost(post)}>
            <i
              className="fas fa-pen fa-1x"
              style={{ color: "rgb(21, 132, 179)" }}
            />
          </button>
        </div>
      )}
    </div>
  );
};
