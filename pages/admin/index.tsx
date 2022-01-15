import type { NextPage } from "next";
import type { ReactElement } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AdminLayout } from "../../components/admin/Layout";

const AdminDashboard: NextPage = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  return (
    <div className="h-screen bg-admin-grey">
      <h1>Dashboard</h1>
    </div>
  );
};

(AdminDashboard as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDashboard;
