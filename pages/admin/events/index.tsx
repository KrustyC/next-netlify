import type { NextPage } from "next";
import type { ReactElement } from "react";
import { AdminLayout } from "../../../components/admin/Layout";
import { IndexLayout } from "../../../components/admin/IndexLayout";
import { EventCard } from "../../../components/admin/Cards/EventCard";
import { useNetlifyGetFunction } from "../../../hooks/useNetlifyGetFunction";

type Event = {
  _id: string;
  title: string;
};

const AdminEvents: NextPage = () => {
  const { data, loading, error } = useNetlifyGetFunction<{ events: Event[] }>({
    fetchUrlPath: "/admin-events",
  });

  const events = data?.events || [];

  const onWantToRemoveEvent = (index: number) => {
    console.log("onWantToRemoveEvent of index:", index);
  };

  return (
    <div className="h-screen bg-admin-grey">
      <div className="flex flex-wrap">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                onWantToRemoveEvent={() => onWantToRemoveEvent(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

(AdminEvents as any).getLayout = function getLayout(page: ReactElement) {
  return (
    <AdminLayout>
      <IndexLayout
        title="Events"
        subtitle="Here you can manage your events."
        itemName="Event"
        createItemPath="/admin/events/new"
      >
        {page}
      </IndexLayout>
    </AdminLayout>
  );
};

export default AdminEvents;
