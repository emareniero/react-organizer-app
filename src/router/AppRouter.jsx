import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { GroupRoutes } from "../thingstobuy/routes/GroupRoutes";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<GroupRoutes/>}></Route>
      ) : (
        <Route path="auth/*" element={<AuthRoutes />}></Route>
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />}></Route>
    </Routes>
  );
};
