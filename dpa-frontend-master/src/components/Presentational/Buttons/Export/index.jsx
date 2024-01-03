import { CSVLink } from "react-csv";

const Export = ({ title = "", data = [], headers = [] }) => {
  return (
    <CSVLink
      data={data}
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
