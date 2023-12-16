import { Navigate } from "react-router-dom";
import { useApiGet } from "../hooks/useApiGet";
import userStore from "../app/userStore";

export default function ProtectedRoute({ children }) {
  const { data: userData, error, loading } = useApiGet("/user");

  const setUser = userStore((state) => state.setUser);

  if (userData) {
    setUser({
      userId: userData.id,
      userProfile: userData.profile,
      userName: userData.name,
    });
    return <>{children}</>;
  } else if (loading) {
    return <>loading</>;
  } else if (error) {
    console.log(error);
    return <Navigate to={"/login"} />;
  }
}
