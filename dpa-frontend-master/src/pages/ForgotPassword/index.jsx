import Layout from "@/layout/Login";
import { Link } from "react-router-dom";
import ForgotPasswordContainers from "@/components/Containers/Authentication/ForgotPassword";

const ForgotPassword = () => {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="h5 mb-2">Esqueceu sua senha?</h1>
        <p className="mb-4">
          Basta digitar seu endereço de e-mail abaixo e enviaremos um link para
          redefinir sua senha!
        </p>
      </div>
      <ForgotPasswordContainers />
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

export default ForgotPassword;
