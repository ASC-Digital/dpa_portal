import React from "react";

export const FilesArea = ({ files, handleDeleteFile }) => {
  return (
    <div>
      {files?.length > 0 && (
        <div style={{ overflow: "scroll", display: "flex", marginTop: 10 }}>
          {files?.map((file) => {
            if (file?.type?.includes("image")) {
              return (
                <div class="mr-3" key={file?.id}>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleDeleteFile(file)}
                  >
                    <span aria-hidden="true">×</span>
                  </button>

                  <img
                    src={file?.url || file?.link}
                    alt={file?.name}
                    width={300}
                    style={{ maxHeight: "50%" }}
                  />
                </div>
              );
            } else {
              return <a href={file?.link}>{file?.name || file?.link}</a>;
            }
          })}
        </div>
      )}
    </div>
  );
};
