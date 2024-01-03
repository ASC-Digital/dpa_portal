import Layout from "@/layout";
import ClustersContainers from "@/components/Containers/Clusters";

const Clusters = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Classificações</h1>
      </div>
      <ClustersContainers />
    </Layout>
  );
};

export default Clusters;
