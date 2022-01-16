import type { NextPage } from "next";
import type { ReactElement } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { AdminLayout } from "layouts/AdminLayout";
import { SummaryCard } from "@/components/admin/Cards/SummaryCard";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";

type Stats = {
  news: number;
  events: number;
  projects: number;
};

const AdminDashboard: NextPage = () => {
  const { user } = useAuth();

  const { data, loading, error } = useNetlifyGetFunction<Stats>({
    fetchUrlPath: "/admin-stats",
    user,
  });

  if (loading) {
    return (
      <div className="p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4">
        <h2>Error fetching your stats, please try again later!</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-gray-600 font-bold">
        Welcome back {user?.user_metadata.full_name}
      </h2>
      <p className="text-gray-600">
        This is your admin panel, where you can handle everything about events,
        news, projects and images.
      </p>

      <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <SummaryCard
          title={`${data.news} News`}
          link={{ path: "/admin/news", copy: "Manage News" }}
        />

        <SummaryCard
          title={`${data.projects} Projects`}
          link={{ path: "/admin/projects", copy: "Manage Projects" }}
        />

        <SummaryCard
          title={`${data.events} Events`}
          link={{ path: "/admin/events", copy: "Manage Events" }}
        />
      </div>
    </div>
  );
};

(AdminDashboard as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDashboard;
