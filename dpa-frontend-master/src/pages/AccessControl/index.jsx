import Layout from "@/layout";
import AccessControlContainers from "@/components/Containers/AccessControl";

const AccessControl = () => {
  return (
    <Layout>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Controle de Acesso</h1>
      </div>
      <AccessControlContainers />
    </Layout>
  );
};

export default AccessControl;
