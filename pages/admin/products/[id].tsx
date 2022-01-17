import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ProductForm } from "@/components/admin/Forms/ProductForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Product } from "@/types/global";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ product: Product }>({
    fetchUrlPath: `/admin-products?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ product: Product }>({ user });

  const onEditProduct = async (updatedProduct: Product) => {
    await onUpdate(`/admin-products?id=${id}`, { product: updatedProduct });

    setTimeout(() => {
      router.push("/admin/products");
    }, 800);
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching product");
    }

    if (updateError) {
      toast.error("Error updating product");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Product</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ProductForm
              pending={pending}
              product={data?.product}
              onSaveProduct={onEditProduct}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminProductsEdit: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

(AdminProductsEdit as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminProductsEdit;
