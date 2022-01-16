import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "layouts/AdminLayout";
import { IndexLayout } from "@/layouts/AdminIndexLayout";

const AdminNews: NextPage = () => {
  return (
    <div className="p-4">
      {/* <h2 className="text-gray-600 font-bold">News</h2>
      <p className="text-gray-600">In this section you can manage your news.</p> */}
    </div>
  );
};

(AdminNews as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="News"
        subtitle="Here you can manage your news."
        itemName="News"
        createItemPath="/admin/news/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminNews;
