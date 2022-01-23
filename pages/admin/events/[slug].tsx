import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { EventForm } from "@/components/admin/Forms/EventForm";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useNetlifyPutFunction } from "@/hooks/useNetlifyPutFunction";
import { Panel } from "@/components/admin/Panel";
import { Event } from "@/types/global";

interface EditProps {
  slug: string;
}

const Edit: React.FC<EditProps> = ({ slug }) => {
  const { user } = useAuth();
  const router = useRouter();

  const { data, loading, error } = useNetlifyGetFunction<{ event: Event }>({
    fetchUrlPath: `/admin-events?slug=${slug}`,
    user,
  });

  const {
    onUpdate,
    pending,
    error: updateError,
  } = useNetlifyPutFunction<{ event: Event; status: "publish" | "draft" }>({
    user,
  });

  const onEditEvent = async (
    updatedEvent: Event,
    status: "publish" | "draft"
  ) => {
    const res = await onUpdate(`/admin-events?slug=${slug}`, {
      event: updatedEvent,
      status,
    });

    if (res !== undefined) {
      toast.success("Event successfully updated!");
      setTimeout(() => {
        router.push("/admin/events");
      }, 800);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Error fetching event");
    }

    if (updateError) {
      toast.error("Error updating event");
    }
  }, [error, updateError]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Edit Event</h2>
      </div>

      <div className="flex justify-between w-100 mt-4">
        <Panel className="mr-4 sm:w-full xl:w-8/12 ">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <EventForm
              pending={pending}
              event={data?.event}
              onSaveEvent={onEditEvent}
            />
          )}
        </Panel>
      </div>
    </div>
  );
};

const AdminEventsEdit: NextPage = () => {
  const router = useRouter();

  const { slug } = router.query as { slug?: string };

  if (!slug) {
    return null;
  }

  return <Edit slug={slug} />;
};

(AdminEventsEdit as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminEventsEdit;
