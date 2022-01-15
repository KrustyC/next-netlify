import { useContext } from "react";
import {
  AuthContext,
  AuthContextProvider,
} from "../../../contexts/AuthContext";
import { AuthenticatedView } from "./AuthenticatedView";
import { UnauthenticatedView } from "./UnauthenticatedView";

const AdminView: React.FC = ({ children }) => {
  const { user, login, logout } = useContext(AuthContext);

  const isLoggedIn = user !== null;

  const onLogin = () => {
    login();
  };

  const onLogout = () => {
    logout();
  };

  return (
    <div className="h-screen bg-admin-grey">
      {isLoggedIn ? (
        <AuthenticatedView onLogout={onLogout}>{children}</AuthenticatedView>
      ) : (
        <UnauthenticatedView onLogin={onLogin} />
      )}
    </div>
  );
};

export const AdminLayout: React.FC = (props) => (
  <AuthContextProvider>
    <AdminView {...props} />
  </AuthContextProvider>
);
