import { Route } from "react-router-dom";
import HomePage from "../pages/homepage";
import LoginPage from "../pages/LoginPages";
import ProtectedPage from "./ProtectedPage";
import RegisterPage from "../pages/RegisterPages";

const routes = [
  <Route
    path="/"
    element={
      <ProtectedPage needLogin={true}>
        <HomePage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/login"
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        <RegisterPage />
      </ProtectedPage>
    }
  />,
];
export default routes;
