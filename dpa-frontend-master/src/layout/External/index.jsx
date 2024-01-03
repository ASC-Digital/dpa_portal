/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useAuth } from "@/contexts/Authentication";
import useProfile from "@/hooks/useProfile";

import useConfigs from "@/hooks/useConfigs";

import MenuMobile from "./partials/MenuMobile";
import LOGO from "@/assets/images/logo-white.png";
import "./styles.css";

const LayoutExternal = ({ children, page = "" }) => {
  const {
    user,
    user: { permissions },
    signOut,
  } = useAuth();
  const { getProfileReports } = useProfile();
  const { listViewConfigs } = useConfigs();

  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png"
  );

  const [menuPEX, setMenuPEX] = useState(false);
  const [menuTraining, setMenuTraining] = useState(false);
  const [configTerms, setConfigTerms] = useState([]);
  const [configSocialMedia, setConfigSocialMedia] = useState([]);

  const listData = async () => {
    const response = await getProfileReports();
    Object.keys(response).forEach((key) => {
      const report = response[key];
      if (report.type === "pex") {
        setMenuPEX(true);
      }

      if (report.type === "training") {
        setMenuTraining(true);
      }
    });
  };

  const listConfigs = async () => {
    const response = await listViewConfigs();
    setConfigTerms(response.filter((config) => config.name === "link-rapido"));

    setConfigSocialMedia(
      response.filter((config) => config.name === "rede-social")
    );
  };

  useEffect(() => {
    if (user.name) {
      setName(user.name);
    }

    if (user.photoUrl) {
      setImage(user.photoUrl);
    }
  }, [user]);

  useEffect(() => {
    listData();
  }, [page]);

  useEffect(() => {
    listConfigs();
  }, []);

  return (
    <div style={{ background: "#F4F4F", overflow: "hidden" }}>
      {isMobile ? (
        <MenuMobile
          permissions={permissions}
          page={page}
          profileImage={image}
          name={name}
        />
      ) : (
        <nav
          className="navbar navbar-expand-lg navbar-dark navbar-light navbar-home"
          style={{ padding: 0 }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "#1584b3",
            }}
          >
            <div>
              <img
                src={LOGO}
                height={100}
                alt="Logo DPA Brasil"
                style={{ marginRight: 10 }}
              />
            </div>
            <div>
              <ul className="navbar-nav mr-auto">
                {permissions.includes("menu-external-home") && (
                  <li
                    className={`nav-item  ${page === "home" ? "active" : ""}`}
                  >
                    <a
                      className="nav-link external-nav-link"
                      style={{ color: "white", fontSize: 18 }}
                      href="/home"
                    >
                      <svg
                        width="25"
                        style={{ marginRight: 3 }}
                        height="20"
                        viewBox="0 0 30 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.6653 2L3 15.6514H5.77291V26H13.3267V21.0459H16.8645V26H23.5578V15.6514H27L14.6653 2Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                      Home
                    </a>
                  </li>
                )}

                {permissions.includes("menu-external-pex") && menuPEX && (
                  <li
                    className={`nav-item external-nav-item ${
                      page === "pex" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link external-nav-link"
                      style={{ color: "white", fontSize: 18 }}
                      href="/pex"
                    >
                      <svg
                        width="25"
                        style={{ marginRight: 3 }}
                        height="20"
                        viewBox="0 0 24 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 25H1.08949H1.30738M24 25H22.8794M1.30738 25V7.85498H4.32684V25M1.30738 25H4.32684M4.32684 25H7.43968M7.43968 25V14.4879H10.4591V25M7.43968 25H10.4591M10.4591 25H13.6654M13.6654 25V10.7273H16.6848V25M13.6654 25H16.6848M16.6848 25H19.7977M19.7977 25V16.5903H22.8794V25M19.7977 25H22.8794M3.6359 3.45111L3.87261 3.28364C4.01664 3.18173 4.1313 3.04371 4.20508 2.88344V2.88344C4.28462 2.71065 4.31348 2.51883 4.28833 2.33028L4.27481 2.22897C4.26307 2.141 4.24274 2.0544 4.2141 1.9704L4.1848 1.88445C4.12409 1.70637 4.02255 1.54497 3.88831 1.41315V1.41315C3.74313 1.27059 3.56425 1.16709 3.3683 1.11226L3.2639 1.08305C3.06774 1.02817 2.86302 1.0106 2.66037 1.03126L2.51661 1.04592C2.30786 1.06719 2.10782 1.14062 1.93487 1.25944V1.25944C1.78307 1.36373 1.65617 1.50023 1.5632 1.65921L1.46623 1.82505C1.36221 2.00294 1.30738 2.20531 1.30738 2.41139V2.41139C1.30738 2.60749 1.35703 2.80039 1.45169 2.97212L1.45754 2.98275C1.53885 3.13025 1.65008 3.25914 1.78411 3.36113L1.80364 3.37599C1.97286 3.50478 2.17061 3.59093 2.38016 3.62717L2.44293 3.63803C2.68824 3.68046 2.94009 3.66453 3.1781 3.59153L3.6359 3.45111ZM3.6359 3.45111L7.91626 8.12495M7.91626 8.12495L8.07978 8.02249C8.2564 7.91182 8.45241 7.83566 8.65742 7.79805L8.67405 7.795C8.85713 7.76141 9.04474 7.76097 9.22797 7.7937V7.7937C9.45391 7.83405 9.66811 7.92394 9.85519 8.05689L9.90552 8.09266C10.0488 8.19445 10.1711 8.3228 10.2659 8.47074V8.47074M7.91626 8.12495L7.6613 8.47074L7.59151 8.63521C7.54084 8.75461 7.5038 8.87935 7.48108 9.00705L7.44303 9.22095C7.40777 9.41917 7.43236 9.62339 7.51368 9.80757V9.80757C7.58979 9.97996 7.71249 10.1277 7.86797 10.2342L7.98168 10.3121C8.12895 10.413 8.29307 10.4867 8.4663 10.5298L8.52891 10.5453C8.80627 10.6144 9.09605 10.6165 9.37441 10.5517V10.5517C9.4671 10.5301 9.55794 10.5012 9.64607 10.4653L9.84419 10.3845L9.98792 10.2549C10.1703 10.0904 10.3077 9.88224 10.3874 9.64997L10.393 9.6334C10.4642 9.42578 10.4847 9.20415 10.4526 8.98702L10.4483 8.95789C10.4227 8.78441 10.3606 8.61836 10.2659 8.47074V8.47074M10.2659 8.47074L13.8213 6.11005M13.8213 6.11005L13.7297 5.94602C13.5951 5.70469 13.5374 5.42796 13.5645 5.15294V5.15294C13.5794 5.00242 13.6196 4.85483 13.6829 4.7175V4.7175C13.7736 4.52104 13.91 4.34806 14.0803 4.21452L14.0894 4.20736C14.2082 4.11416 14.3412 4.04062 14.4833 3.98952L14.6019 3.94686C14.8066 3.87325 15.0248 3.84475 15.2416 3.86332L15.3409 3.87183C15.6273 3.89638 15.8962 4.02026 16.101 4.22204V4.22204C16.1825 4.3023 16.2524 4.39349 16.3087 4.493L16.3881 4.63319C16.4965 4.82484 16.5536 5.04132 16.5536 5.26155V5.26155C16.5536 5.43411 16.5185 5.60487 16.4506 5.7635L16.4137 5.84979C16.3403 6.02136 16.2314 6.17548 16.0942 6.30203V6.30203M13.8213 6.11005L14.2294 6.36301C14.5015 6.53164 14.8153 6.62098 15.1354 6.62098H15.1592C15.2719 6.62098 15.3842 6.60835 15.4941 6.58333L15.6102 6.55689C15.791 6.51569 15.9579 6.42782 16.0942 6.30203V6.30203M16.0942 6.30203L20.2449 10.1353M20.2449 10.1353L20.4927 9.97012C20.706 9.82799 20.9529 9.74461 21.2087 9.72839V9.72839C21.3937 9.71666 21.5792 9.74031 21.7553 9.79807L21.842 9.82652C21.9514 9.86239 22.0539 9.91634 22.1454 9.98614V9.98614C22.249 10.0651 22.3366 10.1631 22.4037 10.2748L22.5155 10.461C22.599 10.6001 22.6552 10.7538 22.6811 10.914V10.914C22.7141 11.1178 22.6971 11.3266 22.6316 11.5224L22.6178 11.5637C22.5687 11.7104 22.4937 11.8472 22.3964 11.9675V11.9675C22.2584 12.1382 22.0793 12.2711 21.8758 12.3536L21.8646 12.3581C21.6761 12.4346 21.4726 12.4673 21.2697 12.4537L21.0812 12.441C20.9083 12.4294 20.7404 12.3778 20.5908 12.2903V12.2903C20.362 12.1566 20.1881 11.9461 20.0999 11.6963L20.0522 11.5613C19.974 11.3397 19.9485 11.1029 19.9778 10.8697L19.985 10.8126C20.0156 10.5691 20.1048 10.3367 20.2449 10.1353V10.1353Z"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                      PEX
                    </a>
                  </li>
                )}

                {permissions.includes("menu-external-training") &&
                  menuTraining && (
                    <li
                      className={`nav-item external-nav-item ${
                        page === "training" ? "active" : ""
                      }`}
                    >
                      <a
                        className="nav-link external-nav-link"
                        style={{ color: "white", fontSize: 18 }}
                        href="/training"
                      >
                        <svg
                          width="25"
                          style={{ marginRight: 3 }}
                          height="20"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.36802 3.59629L3.52368 5.4311C3.21454 5.73865 3.21934 6.24044 3.53431 6.54201L4.04199 7.0281C4.5505 7.51499 4.64361 8.29355 4.26425 8.88661L3.82244 9.84809C3.78548 9.92853 3.75711 10.0126 3.73781 10.099C3.60943 10.6738 3.09937 11.0825 2.51045 11.0825H1.7398C1.33122 11.0825 1 11.4137 1 11.8223V14.3404C1 14.7616 1.34146 15.1031 1.76266 15.1031H2.55755C3.12416 15.1031 3.62014 15.4836 3.76684 16.0309L4.22254 17.1643C4.25031 17.2334 4.28315 17.3003 4.3208 17.3645C4.67115 17.962 4.56936 18.7213 4.07403 19.2055L3.67205 19.5983C3.38039 19.8834 3.37336 20.3504 3.6563 20.6441L5.43928 22.495C5.74955 22.8171 6.26421 22.8204 6.5786 22.5023L7.10908 21.9657C7.54172 21.5279 8.21154 21.4288 8.75247 21.7223C8.82752 21.763 8.90618 21.7967 8.98744 21.8229L10.0155 22.1546C10.6211 22.3189 11.0415 22.8686 11.0415 23.496V24.2208C11.0415 24.6511 11.3903 25 11.8206 25H14.2408C14.6544 25 14.9896 24.6647 14.9896 24.2511V23.6338C14.9896 22.9335 15.4792 22.3286 16.164 22.1826C16.2514 22.164 16.3369 22.1375 16.4195 22.1035L17.1969 21.7835C17.8694 21.449 18.6791 21.569 19.2257 22.0841L19.5335 22.3742C19.844 22.6669 20.3297 22.6643 20.6371 22.3683L22.372 20.6981C22.7076 20.3749 22.7184 19.8411 22.3961 19.5047L21.7003 18.7784C21.3343 18.3964 21.2639 17.8189 21.5274 17.3602C21.5626 17.2989 21.5923 17.2346 21.6161 17.168L21.9224 16.3119C22.1809 15.4651 22.9624 14.8866 23.8478 14.8866H24.1796C24.6327 14.8866 25 14.5193 25 14.0662V11.8738C25 11.4368 24.6457 11.0825 24.2087 11.0825H23.5055C22.8307 11.0825 22.2422 10.6236 22.0777 9.96909L21.615 8.78947C21.5919 8.73062 21.5641 8.67375 21.5317 8.61944C21.2662 8.17367 21.329 7.60578 21.6854 7.22878L22.321 6.55669C22.6177 6.24283 22.6094 5.74935 22.3022 5.44571L20.6506 3.81348C20.32 3.48673 19.7895 3.48208 19.4532 3.80298L18.9465 4.28645C18.4246 4.78452 17.6379 4.88176 17.0104 4.52579L16.0198 4.04714C15.9549 4.01577 15.8874 3.99023 15.8179 3.9708C15.2915 3.82349 14.9275 3.34367 14.9275 2.79697V1.83083C14.9275 1.37197 14.5555 1 14.0966 1H11.65C11.1937 1 10.8238 1.36987 10.8238 1.82612V2.65865C10.8238 3.28608 10.4035 3.8357 9.79793 4L8.9911 4.31071C8.88701 4.35079 8.78908 4.4053 8.70016 4.47263C8.21119 4.84287 7.521 4.78122 7.10539 4.33018L6.45085 3.61982C6.16192 3.30625 5.6703 3.29557 5.36802 3.59629Z"
                            stroke="white"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Treinamento
                      </a>
                    </li>
                  )}

                {permissions.includes("menu-external-gifts") && (
                  <li
                    className={`nav-item external-nav-item ${
                      page === "gifts" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link external-nav-link"
                      style={{ color: "white", fontSize: 18 }}
                      href="/gifts/dashboard"
                    >
                      <svg
                        width="25"
                        style={{ marginRight: 3 }}
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.85677 5.90284H3.18102C2.95884 5.90284 2.73773 5.93354 2.52396 5.99407L2.34763 6.044C1.9684 6.15137 1.63332 6.37691 1.39109 6.68782V6.68782C1.13764 7.01315 1 7.41377 1 7.82618V11.2112C1 11.2241 1.01048 11.2346 1.02341 11.2346H2.23007M6.85677 5.90284L6.36804 5.07946C6.1879 4.77599 6.09284 4.4296 6.09284 4.0767V4.04958C6.09284 3.58534 6.2672 3.13302 6.57591 2.78629V2.78629C6.75936 2.58025 6.98871 2.41528 7.24295 2.30819V2.30819C7.65101 2.13633 8.10711 2.11622 8.5287 2.25151L8.72264 2.31374C9.04537 2.41731 9.34254 2.58796 9.59466 2.81449L13.0318 5.90284M6.85677 5.90284H10.3377M13.0318 5.90284L15.5146 3.32885L17.32 1.73974C17.5976 1.49541 17.9306 1.32248 18.2902 1.23595L18.4642 1.19406C18.9777 1.07049 19.5194 1.1698 19.9557 1.46744V1.46744C20.104 1.56868 20.237 1.69077 20.3506 1.82994L20.537 2.05839C20.7547 2.32515 20.8735 2.65888 20.8735 3.00318V3.00318C20.8735 3.21777 20.8273 3.42985 20.738 3.62499L20.6519 3.81311C20.5182 4.10546 20.328 4.36854 20.0924 4.58728L18.6754 5.90284M13.0318 5.90284H15.5146M13.0318 5.90284H10.3377M18.6754 5.90284H21.9291C22.151 5.90284 22.3724 5.92316 22.5906 5.96355L23.0445 6.0476C23.6079 6.1519 24.1151 6.45504 24.4737 6.90184V6.90184C24.8143 7.32622 25 7.85412 25 8.39831V11.2138C25 11.2253 24.9907 11.2346 24.9792 11.2346H23.5M18.6754 5.90284H15.5146M15.5146 5.90284V25M15.5146 25H10.3377M15.5146 25H21.0531C21.477 25 21.8946 24.8976 22.2705 24.7016L22.3437 24.6635C22.7077 24.4736 23.015 24.1909 23.2344 23.8439V23.8439C23.4732 23.4663 23.5982 23.028 23.5944 22.5813L23.5 11.2346M10.3377 25V5.90284M10.3377 25H4.68972C4.51836 25 4.34736 24.9843 4.17886 24.9531L3.88765 24.8992C3.40014 24.8089 2.96264 24.5431 2.65794 24.152V24.152C2.38065 23.7961 2.23007 23.3578 2.23007 22.9066V11.2346M2.23007 11.2346H23.5"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                      Brindes
                    </a>
                  </li>
                )}

                {
                  <li
                    className={`nav-item external-nav-item ${
                      page === "gifts" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link external-nav-link"
                      style={{ color: "white", fontSize: 18 }}
                      href="/gifts/advertisingMaterials"
                    >
                      <svg
                        width="25"
                        style={{ marginRight: 3 }}
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.36802 3.59629L3.52368 5.4311C3.21454 5.73865 3.21934 6.24044 3.53431 6.54201L4.04199 7.0281C4.5505 7.51499 4.64361 8.29355 4.26425 8.88661L3.82244 9.84809C3.78548 9.92853 3.75711 10.0126 3.73781 10.099C3.60943 10.6738 3.09937 11.0825 2.51045 11.0825H1.7398C1.33122 11.0825 1 11.4137 1 11.8223V14.3404C1 14.7616 1.34146 15.1031 1.76266 15.1031H2.55755C3.12416 15.1031 3.62014 15.4836 3.76684 16.0309L4.22254 17.1643C4.25031 17.2334 4.28315 17.3003 4.3208 17.3645C4.67115 17.962 4.56936 18.7213 4.07403 19.2055L3.67205 19.5983C3.38039 19.8834 3.37336 20.3504 3.6563 20.6441L5.43928 22.495C5.74955 22.8171 6.26421 22.8204 6.5786 22.5023L7.10908 21.9657C7.54172 21.5279 8.21154 21.4288 8.75247 21.7223C8.82752 21.763 8.90618 21.7967 8.98744 21.8229L10.0155 22.1546C10.6211 22.3189 11.0415 22.8686 11.0415 23.496V24.2208C11.0415 24.6511 11.3903 25 11.8206 25H14.2408C14.6544 25 14.9896 24.6647 14.9896 24.2511V23.6338C14.9896 22.9335 15.4792 22.3286 16.164 22.1826C16.2514 22.164 16.3369 22.1375 16.4195 22.1035L17.1969 21.7835C17.8694 21.449 18.6791 21.569 19.2257 22.0841L19.5335 22.3742C19.844 22.6669 20.3297 22.6643 20.6371 22.3683L22.372 20.6981C22.7076 20.3749 22.7184 19.8411 22.3961 19.5047L21.7003 18.7784C21.3343 18.3964 21.2639 17.8189 21.5274 17.3602C21.5626 17.2989 21.5923 17.2346 21.6161 17.168L21.9224 16.3119C22.1809 15.4651 22.9624 14.8866 23.8478 14.8866H24.1796C24.6327 14.8866 25 14.5193 25 14.0662V11.8738C25 11.4368 24.6457 11.0825 24.2087 11.0825H23.5055C22.8307 11.0825 22.2422 10.6236 22.0777 9.96909L21.615 8.78947C21.5919 8.73062 21.5641 8.67375 21.5317 8.61944C21.2662 8.17367 21.329 7.60578 21.6854 7.22878L22.321 6.55669C22.6177 6.24283 22.6094 5.74935 22.3022 5.44571L20.6506 3.81348C20.32 3.48673 19.7895 3.48208 19.4532 3.80298L18.9465 4.28645C18.4246 4.78452 17.6379 4.88176 17.0104 4.52579L16.0198 4.04714C15.9549 4.01577 15.8874 3.99023 15.8179 3.9708C15.2915 3.82349 14.9275 3.34367 14.9275 2.79697V1.83083C14.9275 1.37197 14.5555 1 14.0966 1H11.65C11.1937 1 10.8238 1.36987 10.8238 1.82612V2.65865C10.8238 3.28608 10.4035 3.8357 9.79793 4L8.9911 4.31071C8.88701 4.35079 8.78908 4.4053 8.70016 4.47263C8.21119 4.84287 7.521 4.78122 7.10539 4.33018L6.45085 3.61982C6.16192 3.30625 5.6703 3.29557 5.36802 3.59629Z"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                      MPDV
                    </a>
                  </li>
                }

                {permissions.includes("menu-external-admin") && (
                  <li
                    className={`nav-item external-nav-item ${
                      page === "gifts" ? "active" : ""
                    }`}
                  >
                    <a
                      className="nav-link external-nav-link"
                      style={{ color: "white", fontSize: 18 }}
                      href="/gifts/dashboard"
                    >
                      <i className="fa fa-star" style={{ marginRight: 5 }} />
                      Administrador
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <ul
                className="navbar-nav ml-auto my-2 my-lg-0 navbar-nav-scroll navbar-profile"
                style={{ maxHeight: 100 }}
              >
                <li className="nav-item">
                  <img
                    src={image}
                    alt="foto"
                    style={{
                      borderRadius: "100%",
                      height: "3.5rem",
                      width: "3.5rem",
                    }}
                  />
                </li>
                <li className="nav-item" style={{ padding: "1.6vh 0" }}>
                  <div className="dropdown">
                    <span
                      data-toggle="dropdown"
                      aria-expanded="false"
                      className="btn dropdown-toggle text-white"
                    >
                      Olá {name}!
                    </span>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="/profile">
                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                        Perfil
                      </a>
                      <div className="dropdown-divider"></div>
                      <a
                        className="dropdown-item"
                        href="/#"
                        onClick={() => signOut()}
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                        Logout
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {children}
      <div
        className="mt-4"
        style={{
          width: "100vw",
          margin: "0px auto",
          background: "#FFF",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <nav className="nav">
            {configTerms.map((row, key) => (
              <a
                key={key}
                style={{ fontSize: 16 }}
                className="nav-link active"
                href={row.link}
                target="_blank"
                rel="noreferrer"
              >
                {row.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div
        style={{
          width: "100vw",
          margin: "0px auto",
          background: "#1584b3",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div className="row" style={{ gap: 10 }}>
            <p className="text-white mt-3">Clique e siga:</p>

            {configSocialMedia.map((row, key) => (
              <a
                key={key}
                className="mt-3 text-white"
                href={row.link}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 16 }}
              >
                <img src={row.imageUrl} alt="instagram" height="30" />{" "}
                {row.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutExternal;
