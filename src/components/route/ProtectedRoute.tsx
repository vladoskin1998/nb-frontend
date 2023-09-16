import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const navigate = useNavigate();
  const {isAuth, payloadUser } = useAppSelector((s) => s.authReducer);

  useEffect(() => {
    if (payloadUser.coordinars.lat === null || payloadUser.coordinars.lng === null ){
      navigate("/auth/location");
    }
    else if (!isAuth) {
      navigate("/auth");
    }
  
  }, [isAuth, navigate]);

  return isAuth ? element : null;
};

export default ProtectedRoute;
