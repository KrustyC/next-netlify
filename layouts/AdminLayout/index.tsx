import { useAuth, AuthContextProvider } from "@/contexts/AuthContext";
import { AuthenticatedView } from "./AuthenticatedView";
import { UnauthenticatedView } from "./UnauthenticatedView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminView: React.FC = ({ children }) => {
  const { user, login, logout } = useAuth();

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
      <ToastContainer />
    </div>
  );
};

export const AdminLayout: React.FC = (props) => (
  <AuthContextProvider>
    <AdminView {...props} />
  </AuthContextProvider>
);
