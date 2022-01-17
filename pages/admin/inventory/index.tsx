import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "layouts/AdminLayout";

const AdminInventory: NextPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">Resources</h2>
      <p className="text-gray-600">
        In this section you can manage your whole inventory.
      </p>
    </div>
  );
};

(AdminInventory as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminInventory;
