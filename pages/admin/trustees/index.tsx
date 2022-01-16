import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/admin/Layout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { IndexLayout } from "@/components/admin/IndexLayout";
import { TrusteeCard } from "@/components/admin/Cards/TrusteeCard";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";

type Trustee = {
  _id: string;
  name: string;
  postcode: string;
};

const AdminTrustees: NextPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useNetlifyGetFunction<{ trustees: Trustee[] }>(
    {
      fetchUrlPath: "/admin-trustees",
      user,
    }
  );

  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [trusteeToRemoveIndex, setTrusteeToRemoveIndex] = useState(-1);

  useEffect(() => {
    if (data?.trustees) {
      setTrustees(data.trustees);
    }
  }, [data?.trustees]);

  const onWantToRemoveTrustee = (index: number) => {
    setTrusteeToRemoveIndex(index);
  };

  const onRemoveConfirmed = () => {
    const updatedTrustees = [
      ...trustees.slice(0, trusteeToRemoveIndex),
      ...trustees.slice(trusteeToRemoveIndex + 1),
    ];

    setTrusteeToRemoveIndex(-1);
    setTrustees(updatedTrustees);
  };

  const onRemoveCancelled = () => {
    setTrusteeToRemoveIndex(-1);
  };

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <div>Loading...</div>
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
