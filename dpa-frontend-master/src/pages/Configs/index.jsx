import Layout from "@/layout";
import ConfigsContainers from "@/components/Containers/Configs";

const Configs = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Configurações</h1>
      </div>
      <ConfigsContainers />
    </Layout>
  );
};

export default Configs;
