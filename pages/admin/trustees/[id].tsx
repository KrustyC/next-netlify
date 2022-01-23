import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { TrusteeForm } from "@/components/admin/Forms/TrusteeForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Trustee } from "@/types/global";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ trustee: Trustee }>({
    fetchUrlPath: `/admin-trustees?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ trustee: Trustee }>({ user });

  const onEditTrustee = async (updatedTrustee: Trustee) => {
    const res = await onUpdate(`/admin-trustees?id=${id}`, {
      trustee: updatedTrustee,
    });

    if (res !== undefined) {
      toast.success("Trustee successfully updated");

      setTimeout(() => {
        router.push("/admin/trustees");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching trustee");
    }

    if (updateError) {
      toast.error("Error updating trustee");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Trustee</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TrusteeForm
              pending={pending}
              trustee={data?.trustee}
              onSaveTrustee={onEditTrustee}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminTrusteesEdit: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

(AdminTrusteesEdit as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminTrusteesEdit;
