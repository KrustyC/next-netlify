import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "@/components/admin/Layout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { IndexLayout } from "@/components/admin/IndexLayout";
import { ProductCard } from "@/components/admin/Cards/ProductCard";
import { Product } from "@/types/global";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";

const AdminProducts: NextPage = () => {
  const {
    items: products,
    loading,
    error,
    itemToRemoveIndex: productToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveProduct,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ products: Product[] }, Product>({
    fetchPath: "/admin-products",
    parseResponse: (response) => response.products,
  });

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                onWantToRemoveProduct={() => onWantToRemoveProduct(index)}
              />
            ))}
          </div>
        )}
      </div>

      {productToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="product"
          itemToDelete={products[productToRemoveIndex]}
          questionItem={products[productToRemoveIndex].name}
          deletePath={`/admin-products?id=${products[productToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

(AdminProducts as any).getLayout = function getLayout(page: ReactElement) {
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

export default AdminProducts;
