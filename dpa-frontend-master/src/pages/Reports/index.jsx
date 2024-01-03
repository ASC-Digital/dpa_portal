import Layout from "@/layout";
import ReportsContainers from "@/components/Containers/Reports";

const Reports = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Relatórios</h1>
      </div>
      <ReportsContainers />
    </Layout>
  );
};

export default Reports;
