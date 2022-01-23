import type { NextPage } from "next";
import type { ReactElement } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { EventForm } from "@/components/admin/Forms/EventForm";
import { Panel } from "@/components/admin/Panel";
import { useNetlifyPostFunction } from "@/hooks/useNetlifyPostFunction";
import { Event } from "@/types/global";
import { useRouter } from "next/router";

const AdminEventsCreate: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const {
    onCreate,
    pending,
    error: createError,
  } = useNetlifyPostFunction<{ event: Event; status: "publish" | "draft" }>({
    user,
  });

  const onCreateEvent = async (event: Event, status: "publish" | "draft") => {
    const res = await onCreate(`/admin-events`, { event, status });

    if (res !== undefined) {
      toast.success("Event successfully added!");
      setTimeout(() => {
        router.push("/admin/events");
      }, 800);
    }
  };

  useEffect(() => {
    if (createError) {
      toast.error(createError);
    }
  }, [createError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Create Event</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          <EventForm pending={pending} onSaveEvent={onCreateEvent} />
        </Panel>
      </div>
    </div>
  );
};

(AdminEventsCreate as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminEventsCreate;
