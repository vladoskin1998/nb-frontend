import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((s: any) => s.authReducer.isAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
