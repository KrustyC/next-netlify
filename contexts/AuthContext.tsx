import netlifyIdentity from "netlify-identity-widget";
import { createContext, useState, useEffect } from "react";

type NetlifyUser = {
  user: { user_metadata: { full_name: string } };
  token: {
    access_token: string;
    expires_at: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
  };
};

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
