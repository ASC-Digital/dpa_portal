import Layout from "@/layout";
import BranchesContainers from "@/components/Containers/Branches";

const Branches = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Filiais</h1>
      </div>
      <BranchesContainers />
    </Layout>
  );
};

export default Branches;
