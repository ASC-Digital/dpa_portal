import Layout from "@/layout/Login";
import { Link } from "react-router-dom";
import Authentication from "@/components/Containers/Authentication/Email";

const Login = () => {
  return (
    <Layout>
      <Authentication />
      <div className="text-right mt-3 mb-5">
        <Link className="small" to={"forgot-password"}>
          Esqueceu a senha?
        </Link>
      </div>
    </Layout>
  );
};

export default Login;
