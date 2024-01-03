import Layout from "@/layout";
import RolesContainers from "@/components/Containers/Roles";

const Users = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Perfil</h1>
      </div>
      <RolesContainers />
    </Layout>
  );
};

export default Users;
