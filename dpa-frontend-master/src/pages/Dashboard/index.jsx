import Layout from "@/layout";
import DashboardContainers from "@/components/Containers/Dashboard";

const Dashboard = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <DashboardContainers />
    </Layout>
  );
};

export default Dashboard;
