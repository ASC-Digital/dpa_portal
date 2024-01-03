/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { getBannerLogin } from "@/services/Profile";
import { useLoader } from "@/contexts/Loader";
import LOGO from "@/assets/images/logo.png";

const LayoutLogin = ({ children }) => {
  const { setLoader } = useLoader();
  const [banner, setBanner] = useState([]);

  const listData = async () => {
    setLoader(true);
    const response = await getBannerLogin();

    if (response.data === null) {
      setBanner({
        backgroundColor: "#1584B3",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      });
      setLoader(false);
      return;
    }

    setBanner({
      backgroundImage: `url("${response.data.imageUrl}")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
    });

    setLoader(false);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <div style={banner}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-4 col-lg-12 col-md-8">
            <div
              className="card o-hidden border-0 shadow-lg"
              style={{ marginTop: 140 }}
            >
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12 d-none d-lg-block bg-LayoutLogin-image" />
                  <div className="col-lg-12">
                    <div className="p-3" style={{ background: "#FFFFFF" }}>
                      <div className="text-center mb-5">
                        <img src={LOGO} alt="logo" width="180" />
                      </div>
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutLogin;
