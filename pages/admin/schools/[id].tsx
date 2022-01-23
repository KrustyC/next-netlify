import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { SchoolForm } from "@/components/admin/Forms/SchoolForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { School } from "@/types/global";

interface EditProps {
  id: string;
}

const Edit: React.FC<EditProps> = ({ id }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ school: School }>({
    fetchUrlPath: `/admin-schools?id=${id}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ school: School }>({ user });

  const onEditSchool = async (updatedSchool: School) => {
    const res = await onUpdate(`/admin-schools?id=${id}`, {
      school: updatedSchool,
    });

    if (res !== undefined) {
      toast.success("School successfully updated");

      setTimeout(() => {
        router.push("/admin/schools");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching school");
    }

    if (updateError) {
      toast.error("Error updating school");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit School</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <SchoolForm
              pending={pending}
              school={data?.school}
              onSaveSchool={onEditSchool}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminSchoolsEdit: NextPage = () => {
  const router = useRouter();

  const { id } = router.query as { id?: string };

  if (!id) {
    return null;
  }

  return <Edit id={id} />;
};

(AdminSchoolsEdit as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminSchoolsEdit;
