import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div className=" flex items-center justify-center min-h-[80vh]">
        <span className="loading loading-ring loading-lg text-emerald-500"></span>
      </div>
    );
  if (user) {
    return <>{children}</>;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoutes;
