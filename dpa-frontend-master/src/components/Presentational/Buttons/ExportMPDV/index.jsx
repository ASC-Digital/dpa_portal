import { CSVLink } from "react-csv";
import { format } from "date-fns";

const organizeDownloadData = (data) => {
  // Mapeia os dados e organiza por download
  const organizedData = data.flatMap((item) =>
    item.downloadedAdvertisingMaterials.map((download) => ({
      id: item.id,
      uploadedUrl: item.uploadedUrl,
      type: item.type,
      brand: item.brand,
      typeOfMpdv: item.typeOfMpdv,
      digitalMPDV: item.digitalMPDV,
      description: item.description,
      link: item.link,
      status: item.deletedAt ? "Inativo" : "Ativo",
      downloadedBy: download.user.name,
      createdAt: format(new Date(download.createdAt), "dd-MM-yyyy 'às' HH:mm:ss"),
    }))
  );

  organizedData.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
  
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });
  
  const organizedDataFinal = [...organizedData].reverse();
  
  return organizedDataFinal;
};

const Export = ({ title = "", data = [], headers = [] }) => {
  const organizedData = organizeDownloadData(data);

  return (
    <CSVLink
      data={organizedData}
      filename={"file.csv"}
      className="btn btn-success"
      target="_blank"
      headers={headers}
    >
      {title}
    </CSVLink>
  );
};

export default Export;
