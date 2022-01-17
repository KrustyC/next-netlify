import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";

const AdminProjects: NextPage = () => {
  return (
    <div className="p-4">
      {/* <h2 className="text-gray-600 font-bold">Projects</h2>
      <p className="text-gray-600">In this section you can manage your projects.</p> */}
    </div>
  );
};

(AdminProjects as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="Projects"
        subtitle="Here you can manage your projects."
        itemName="Projects"
        createItemPath="/admin/projects/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminProjects;
