/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Input } from "./input";
import { Avatar } from "../avatar";
import { PhotoBtn } from "../shared/buttons/photoBtn";
import { DocumentBtn } from "../shared/buttons/documentBtn";

export const NewPost = ({ handleOpenCreatePostModal, currentUser }) => {
  const { name, photoUrl } = currentUser;

  return (
    <div>
      <h4
        className="pb-5"
        style={{ color: "#1584b3", fontSize: 20, textAlign: "center" }}
      >
        Feed de Notícias e Comunicados
      </h4>
      <div
        class="panel container p-4 mt-2 shadowAdded"
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          fontFamily: "sans-serif",
        }}
      >
        <div class="panel-body">
          <div className="d-flex align-items-center">
            <Avatar name={name} photoUrl={photoUrl} />
            <Input handleOpenCreatePostModal={handleOpenCreatePostModal} />
          </div>

          <hr />
          <div class="mt-3 d-flex">
            <PhotoBtn handleClick={handleOpenCreatePostModal} />
            <DocumentBtn handleClick={handleOpenCreatePostModal} />
            <PhotoBtn
              handleClick={handleOpenCreatePostModal}
              title={"Link Vídeo"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
