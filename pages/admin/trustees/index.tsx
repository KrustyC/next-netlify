import type { NextPage } from "next";
import { ReactElement } from "react";
import { AdminLayout } from "@/components/admin/Layout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { IndexLayout } from "@/components/admin/IndexLayout";
import { TrusteeCard } from "@/components/admin/Cards/TrusteeCard";
import { Trustee } from "@/types/global";
import { useAdminIndexList } from "@/hooks/useAdminIndexList";

const AdminTrustees: NextPage = () => {
  const {
    items: trustees,
    loading,
    error,
    itemToRemoveIndex: trusteeToRemoveIndex,
    onWantToRemoveItem: onWantToRemoveTrustee,
    onRemoveConfirmed,
    onRemoveCancelled,
  } = useAdminIndexList<{ trustees: Trustee[] }, Trustee>({
    fetchPath: "/admin-trustees",
    parseResponse: (response) => response.trustees,
  });

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {trustees.map((trustee, index) => (
              <TrusteeCard
                key={trustee._id}
                trustee={trustee}
                onWantToRemoveTrustee={() => onWantToRemoveTrustee(index)}
              />
            ))}
          </div>
        )}
      </div>

      {trusteeToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="trustee"
          itemToDelete={trustees[trusteeToRemoveIndex]}
          questionItem={trustees[trusteeToRemoveIndex].name}
          deletePath={`/admin-trustees?id=${trustees[trusteeToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

(AdminTrustees as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="Trustees"
        subtitle="Here you can manage your trustees."
        itemName="Trustee"
        createItemPath="/admin/trustees/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminTrustees;
