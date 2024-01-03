import Layout from "@/layout";
import ProfileContainers from "@/components/Containers/Profile";

const Profile = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Meus Dados</h1>
      </div>
      <ProfileContainers />
    </Layout>
  );
};

export default Profile;
