import type { NextPage } from "next";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { TrusteeForm } from "@/components/admin/Forms/TrusteeForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Trustee } from "@/types/global";
import { useRouter } from "next/router";

const AdminTrusteesCreate: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: updateError,
  } = useNetlifyPostFunction<{ trustee: Trustee }>({ user });

  const onCreateTrustee = async (trustee: Trustee) => {
    const res = await onCreate(`/admin-trustees`, { trustee });

    if (res !== undefined) {
      toast.success("Trustee successfully added to the database!");
      setTimeout(() => {
        router.push("/admin/trustees");
      }, 800);
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError.message);
    }
  }, [updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Trustee</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <TrusteeForm pending={pending} onSaveTrustee={onCreateTrustee} />
        </Panel>
      </div>
    </div>
  );
};

(AdminTrusteesCreate as any).getLayout = function getLayout(
  page: ReactElement
) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminTrusteesCreate;
