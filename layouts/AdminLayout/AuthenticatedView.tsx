import { NavBar } from "./Navbar";
import { Sidebar } from "./Sidebar";

interface AuthenticatedViewProps {
  onLogout: VoidFunction;
}

export const AuthenticatedView: React.FC<AuthenticatedViewProps> = ({
  children,
  onLogout,
}) => (
  <div>
    <NavBar onLogout={onLogout} />

    <div className="flex overflow-hidden bg-white pt-12">
      <Sidebar />

      <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" />

      <div
        id="main-content"
        className="h-full w-full bg-admin-grey relative overflow-y-auto lg:ml-64 pt-2"
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  </div>
);
