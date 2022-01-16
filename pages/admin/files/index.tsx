import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";

const AdminFiles: NextPage = () => {
  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">Files</h2>
      <p className="text-gray-600">In this section you can manage your news.</p>
    </div>
  );
};

(AdminFiles as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="Products"
        subtitle="Here you can manage your products."
        itemName="Product"
        createItemPath="/admin/products/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminFiles;
