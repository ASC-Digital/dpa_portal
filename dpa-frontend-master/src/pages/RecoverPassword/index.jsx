import Layout from "@/layout/Login";
import { Link } from "react-router-dom";
import RecoverPasswordContainers from "@/components/Containers/Authentication/RecoverPassword";

const RecoverPassword = () => {
  return (
    <Layout>
      <div className="text-center" style={{ color: "white" }}>
        <h1 className="h5 mb-2">Recupere sua senha</h1>
        <p className="mb-4">Informe sua nova senha abaixo:</p>
      </div>
      <RecoverPasswordContainers />
      <div className="text-center mt-3">
        <Link
          className="small"
          to={"/login"}
          style={{ color: "white", fontWeight: 800 }}
        >
          Já tem uma conta? Conecte-se!
        </Link>
      </div>
    </Layout>
  );
};

export default RecoverPassword;
