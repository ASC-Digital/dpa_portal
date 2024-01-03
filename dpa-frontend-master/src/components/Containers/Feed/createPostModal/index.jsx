import { useRef } from "react";
import SelectRoles from "../../SelectRoles";

import { DocumentBtn } from "../shared/buttons/documentBtn";
import { PhotoBtn } from "../shared/buttons/photoBtn";
import { FilesArea } from "./filesArea";
import { Modal } from "../shared/modal";
import Loader from "@/components/Presentational/Loader";

export const CreatePostModal = ({
  modal,
  onClose,
  files,
  setFiles,
  handleCreatePost,
  setAttachments,
  setSelectedRole,
  selectedRole,
  setNewPost,
  newPost,
  loadingUpload,
}) => {
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleDeleteFile = (file) => {
    const filtered = files?.filter((item) => item?.name !== file?.name);
    setAttachments(filtered);
  };

  function getBase64(file) {
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setFiles({
          type: file?.type,
          url: reader.result,
          name: file?.name,
          file,
        });
      };
    }
  }

  const handleInputLink = () => {
    const link = prompt("Insira o link no campo abaixo:");
    if (link?.length) {
      setFiles({
        type: "video",
        url: link,
        name: link,
      });
    }
  };
  return (
    <Modal modal={modal} onClose={onClose}>
      {loadingUpload ? (
        <Loader />
      ) : (
        <div className="px-3 mt-2">
          <SelectRoles
            onChange={(e) => setSelectedRole(e?.target?.value)}
            value={selectedRole}
          />

          <textarea
            placeholder="No que está pensando?"
            name=""
            id=""
            cols="30"
            rows="5"
            style={{ border: "none", padding: 10, width: "100%" }}
            value={newPost}
            onChange={(e) => setNewPost(e?.target?.value)}
          />
          <input
            type="file"
            onChange={(e) => getBase64(e.target.files[0])}
            ref={inputRef}
            multiple
            style={{ display: "none" }}
          />

          <FilesArea files={files} handleDeleteFile={handleDeleteFile} />

          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <PhotoBtn handleClick={handleUploadClick} />
              <DocumentBtn handleClick={handleUploadClick} />
              <PhotoBtn handleClick={handleInputLink} title={"Link Vídeo"} />
            </div>
            <button
              className="btn btn-primary w-40 my-2"
              onClick={handleCreatePost}
            >
              Postar
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
