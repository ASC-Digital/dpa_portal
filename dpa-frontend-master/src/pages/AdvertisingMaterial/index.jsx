import Layout from "@/layout";
import AdvertisingMaterial from "@/components/Containers/AdvertisingMaterials";

const AdvertisingMaterials = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">MPDV</h1>
      </div>
      <AdvertisingMaterial />
    </Layout>
  );
};

export default AdvertisingMaterials;
