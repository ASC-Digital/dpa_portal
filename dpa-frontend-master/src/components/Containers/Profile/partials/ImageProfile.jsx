import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/Authentication";

const ImageProfile = () => {
  const { user } = useAuth();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user.photoUrl) {
      setImage(user.photoUrl);
    }
  }, [user]);

  return (
    <div className="col-xl-4 col-lg-5">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            Imagem do Perfil
          </h6>
        </div>
        <div className="card-body text-center">
          <img
            className="img-account-profile rounded-circle mb-2"
            src={image}
            width={"50%"}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
};

export default ImageProfile;
