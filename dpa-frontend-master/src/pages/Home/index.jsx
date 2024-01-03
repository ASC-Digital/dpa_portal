import Layout from "@/layout/External";
import Cards from "./partials/Cards";
import Banners from "./partials/Banners";
import { FeedsContainer } from "@/components/Containers/Feed";

const Home = () => {
  return (
    <Layout page="home">
      <div
        className="mt-4 pt-4"
        style={{
          width: "100vw",
          margin: "0 auto",
          background: "#FFF",
        }}
      >
        <Banners />
        <div className="container mt-5">
          <div className="pb-3" />
        </div>
      </div>
      <Cards />
      <div className="container mt-5">
        <div className="pb-3" />
      </div>
      <FeedsContainer />
    </Layout>
  );
};

export default Home;
