import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "layouts/AdminLayout";

const AdminFiles: NextPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">Files</h2>
      <p className="text-gray-600">In this section you can manage your news.</p>
    </div>
  );
};

(AdminFiles as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminFiles;
