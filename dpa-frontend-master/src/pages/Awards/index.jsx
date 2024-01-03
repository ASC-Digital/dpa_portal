import Layout from "@/layout";
import AwardsContainers from "@/components/Containers/Awards";

const Awards = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Metas</h1>
      </div>
      <AwardsContainers />
    </Layout>
  );
};

export default Awards;
