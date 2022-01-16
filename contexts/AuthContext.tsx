import netlifyIdentity from "netlify-identity-widget";
import { createContext, useContext, useState, useEffect } from "react";
import { NetlifyUser } from "../types/auth";

type AuthContextType = {
  user: NetlifyUser | null;
  login: VoidFunction;
  logout: VoidFunction;
  authReady: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<NetlifyUser | null>(null);

  useEffect(() => {
    // on login
    netlifyIdentity.on("login" as any, (user) => {
      setUser(user as any);
      netlifyIdentity.close();
    });

    // on logout
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    // connect with Netlify Identity
    netlifyIdentity.init();
  }, []);

  const login = () => {
    netlifyIdentity.open("login");
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const context = {
    login,
    logout,
    user,
    authReady: !!user,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};
