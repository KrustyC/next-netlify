import { Controller, useForm } from "react-hook-form";
import { Event } from "@/types/global";
import { ImageSelector } from "@/components/admin/ImageSelector";
import { DayPicker } from "@/components/admin/DayPicker";
import { TimePeriodSelector } from "@/components/admin/TimePeriodSelector";
import { LoadingSpinner } from "../LoadingSpinner";
import { Input } from "../Input";
import { Editor } from "../Editor";

interface EventFormProps {
  className?: string;
  product?: Event;
  pending?: boolean;
  onSaveEvent: (product: Event, status: "publish" | "draft") => void;
}

const DEFAULT_EVENT: Event = {
  title: "",
  image: "",
  description: {},
  eventbriteLink: "",
  date: {
    day: "",
    startTime: {
      time: "",
      period: "AM",
    },
    endTime: {
      time: "",
      period: "AM",
    },
  },
};

export const EventForm: React.FC<EventFormProps> = ({
  product = DEFAULT_EVENT,
  pending,
  onSaveEvent,
}) => {
  const { register, control, handleSubmit } = useForm<Event>({
    defaultValues: { ...product },
  });

  const onSaveDraft = () => {
    handleSubmit((data) => onSaveEvent(data, "draft"))();
  };

  const onPublish = () => {
    handleSubmit((data) => onSaveEvent(data, "publish"))();
  };

  return (
    <form className="flex flex-col w-full">
      <div className="flex mb-8">
        <div className="flex flex-col w-1/2">
          <div className="mb-4">
            <Input
              register={register}
              label="Title"
              name="title"
              type="title"
              placeholder="Event Name"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="uppercase block text-gray-700 text-sm font-bold mb-3">
              Date
            </label>

            <Controller
              name="date.day"
              render={(props) => (
                <DayPicker
                  value={props.field.value}
                  onBlur={props.field.onBlur}
                  onChange={(newDate) => {
                    props.field.onChange(newDate);
                  }}
                />
              )}
              control={control}
            />
          </div>

          <div className="flex mb-4">
            <div className="flex flex-col mr-8">
              <label className="uppercase block text-gray-700 text-sm font-bold mb-3">
                Start Time
              </label>
              <div className="flex">
                <Input
                  register={register}
                  name="date.startTime.time"
                  type="text"
                  width="w-24"
                  placeholder="HH:mm"
                />
                <TimePeriodSelector
                  className="ml-2"
                  name="date.startTime.period"
                  register={register}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="uppercase block text-gray-700 text-sm font-bold mb-3">
                End Time
              </label>
              <div className="flex">
                <Input
                  register={register}
                  name="date.endTime.time"
                  type="text"
                  width="w-24"
                  placeholder="HH:mm"
                />
                <TimePeriodSelector
                  className="ml-2"
                  name="date.endTime.period"
                  register={register}
                />
              </div>
            </div>
          </div>

          <div>
            <Input
              register={register}
              type="url"
              label="EventBrite Link"
              name="eventbriteLink"
              placeholder="EventBrite Link"
            />
          </div>
        </div>

        <div className="w-1/2 ml-8">
          <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
            Image
          </span>

          <Controller
            name="image"
            render={(props) => (
              <ImageSelector
                currentImage={props.field.value}
                onSelectImage={(image) => {
                  props.field.onChange(image);
                }}
              />
            )}
            control={control}
          />
        </div>
      </div>

      <div className="mb-8">
        <span className="uppercase block text-gray-700 text-sm font-bold mb-2">
          Description
        </span>
        <div className="h-24">
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Editor value={value} onChange={onChange} />
            )}
          />
        </div>
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="button"
          onClick={onSaveDraft}
          disabled={pending} // @TODO Check from react hook form
        >
          {pending ? <LoadingSpinner /> : "Save Draft"}
        </button>

        <button
          className="btn-admin btn-outlined-primary mr-4"
          type="button"
          onClick={onPublish}
          disabled={pending} // @TODO Check from react hook form
        >
          {pending ? <LoadingSpinner /> : "Published Event"}
        </button>
      </div>
    </form>
  );
};
