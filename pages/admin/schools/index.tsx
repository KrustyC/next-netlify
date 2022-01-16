import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/components/admin/Layout";
import { DeleteItemModal } from "@/components/admin/DeleteItemModal";
import { IndexLayout } from "@/components/admin/IndexLayout";
import { SchoolCard } from "@/components/admin/Cards/SchoolCard";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { School } from "@/types/global";

const AdminSchools: NextPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useNetlifyGetFunction<{ schools: School[] }>(
    {
      fetchUrlPath: "/admin-schools",
      user,
    }
  );

  const [schools, setSchools] = useState<School[]>([]);
  const [schoolToRemoveIndex, setSchoolToRemoveIndex] = useState(-1);

  useEffect(() => {
    if (data?.schools) {
      setSchools(data.schools);
    }
  }, [data?.schools]);

  const onWantToRemoveSchool = (index: number) => {
    setSchoolToRemoveIndex(index);
  };

  const onRemoveConfirmed = () => {
    const updatedSchools = [
      ...schools.slice(0, schoolToRemoveIndex),
      ...schools.slice(schoolToRemoveIndex + 1),
    ];

    setSchoolToRemoveIndex(-1);
    setSchools(updatedSchools);
  };

  const onRemoveCancelled = () => {
    setSchoolToRemoveIndex(-1);
  };

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {schools.map((school, index) => (
              <SchoolCard
                key={school._id}
                school={school}
                onWantToRemoveSchool={() => onWantToRemoveSchool(index)}
              />
            ))}
          </div>
        )}
      </div>

      {schoolToRemoveIndex > -1 ? (
        <DeleteItemModal
          itemGenericName="school"
          itemToDelete={schools[schoolToRemoveIndex]}
          questionItem={schools[schoolToRemoveIndex].name}
          deletePath={`/admin-schools?id=${schools[schoolToRemoveIndex]._id}`}
          onSuccess={onRemoveConfirmed}
          onCancel={onRemoveCancelled}
        />
      ) : null}
    </div>
  );
};

(AdminSchools as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="Schools"
        subtitle="Here you can manage your schools."
        itemName="School"
        createItemPath="/admin/schools/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminSchools;
