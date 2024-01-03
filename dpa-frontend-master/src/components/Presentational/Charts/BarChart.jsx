import { Chart } from "react-google-charts";

const options = {
  hAxis: { title: "Valores", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "70%", height: "70%" },
};

const BarChart = ({ data }) => {
  const rows = [["Meses", "Valores"]];

  data.map((d, i) => rows.push([d.related, d.totalProfit]));

  if (data.length === 0) {
    return "Nenhum dado encontrado.";
  }

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="400px"
      data={rows}
      options={options}
    />
  );
};

export default BarChart;
