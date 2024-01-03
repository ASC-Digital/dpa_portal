import Layout from "@/layout";
import DistributorsContainers from "@/components/Containers/Distributors";

const Distributors = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Distribuidores</h1>
      </div>
      <DistributorsContainers />
    </Layout>
  );
};

export default Distributors;
