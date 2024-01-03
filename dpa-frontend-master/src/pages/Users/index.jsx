import Layout from "@/layout";
import UsersContainers from "@/components/Containers/Users";

const Users = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Usuários</h1>
      </div>
      <UsersContainers />
    </Layout>
  );
};

export default Users;
