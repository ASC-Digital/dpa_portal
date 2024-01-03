import Layout from "@/layout";
import BannersContainers from "@/components/Containers/Banners";

const Banners = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Banners</h1>
      </div>
      <BannersContainers />
    </Layout>
  );
};

export default Banners;
