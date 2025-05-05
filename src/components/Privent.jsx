import { Navigate } from "react-router-dom";

const SuperUserRoute = ({ element }) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }


  return element;
};

export default SuperUserRoute;
