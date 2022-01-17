import type { NextPage } from "next";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { ProductForm } from "@/components/admin/Forms/ProductForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Product } from "@/types/global";
import { useRouter } from "next/router";

const AdminProductsCreate: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ product: Product }>({ user });

  const onCreateProduct = async (product: Product) => {
    await onCreate(`/admin-products`, { product });

    toast.success("Product successfully added!");

    setTimeout(() => {
      router.push("/admin/products");
    }, 800);
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
    }
  }, [updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Product</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <ProductForm pending={pending} onSaveProduct={onCreateProduct} />
        </Panel>
      </div>
    </div>
  );
};

(AdminProductsCreate as any).getLayout = function getLayout(
  page: ReactElement
) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminProductsCreate;
