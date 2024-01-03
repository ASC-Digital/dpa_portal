/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "@/layout/External";
import useProfile from "@/hooks/useProfile";
import { useLoader } from "@/contexts/Loader";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { sendPowerBI } from "@/services/PowerBI";
import "./styles.css";

const PEX = () => {
  const { setLoader } = useLoader();
  const { getProfileReports } = useProfile();
  const [reports, setReports] = useState([]);
  const [powerBI, setPowerBI] = useState({});
  const [format, setFormat] = useState("");
  const [embeddedLink, setEmbeddedLink] = useState("");

  const listFormat = async (format, groupId, reportId, url) => {
    setLoader(true);

    if (format === "embedded") {
      setFormat(format);
      setEmbeddedLink(url);
      setLoader(false);
      return;
    }

    const sendPowerBIResponse = await sendPowerBI({
      groupId: groupId,
      reportId: reportId,
    });

    setFormat(format);
    setPowerBI(sendPowerBIResponse.data);
    setLoader(false);
  };

  const listData = async () => {
    setLoader(true);
    const getProfileReportsResponse = await getProfileReports(`?type=pex`);

    if (getProfileReportsResponse[0].format === "embedded") {
      setReports(getProfileReportsResponse);
      setFormat(getProfileReportsResponse[0].format);
      setEmbeddedLink(getProfileReportsResponse[0].embeddedLink);
      setLoader(false);
      return;
    }

    const sendPowerBIResponse = await sendPowerBI({
      groupId: getProfileReportsResponse[0].powerbiGroupId,
      reportId: getProfileReportsResponse[0].powerbiReportId,
    });

    setFormat(getProfileReportsResponse[0].format);
    setReports(getProfileReportsResponse);
    setPowerBI(sendPowerBIResponse.data);
    setLoader(false);
  };

  useEffect(() => {
    listData();
  }, []);

  return (
    <Layout page="training">
      <div className="container mt-3">
        <ul className="nav nav-pills" style={{ gap: 10 }}>
          {reports.map((item, key) => (
            <li className="nav-item" key={key}>
              <button
                type="button"
                className="btn"
                style={{
                  width: 145, backgroundColor: "#1584b3",
                  color: "white",
                }}
                onClick={() =>
                  listFormat(
                    item.format,
                    item.powerbiGroupId,
                    item.powerbiReportId,
                    item.embeddedLink
                  )
                }
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="mt-4"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FFF",
        }}
      >
        {format === "embedded" && (
          <iframe
            title="pex"
            src={embeddedLink}
            style={{ width: "100%", height: "100%", border: 0 }}
          ></iframe>
        )}
        {format === "powerbi" && (
          <div className="holder-pex">
            <div className="bar-pex"></div>
            <PowerBIEmbed
              embedConfig={{
                type: "report",
                id: powerBI.id,
                embedUrl: powerBI.embedUrl,
                accessToken: powerBI.accessToken,
                tokenType: models.TokenType.Embed,
                settings: {
                  panes: {
                    filters: {
                      expanded: false,
                      visible: false,
                    },
                  },
                },
              }}
              eventHandlers={
                new Map([
                  [
                    "loaded",
                    function () {
                      console.log("Report loaded");
                    },
                  ],
                  [
                    "rendered",
                    function () {
                      console.log("Report rendered");
                    },
                  ],
                  [
                    "error",
                    function (event) {
                      console.log(event.detail);
                    },
                  ],
                ])
              }
              cssClassName={"embed-container"}
              getEmbeddedComponent={(embeddedReport) => {
                window.report = embeddedReport;
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PEX;
