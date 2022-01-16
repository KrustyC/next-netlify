import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { LoadingSpinner } from "../LoadingSpinner";

interface SchoolFormProps {
  className?: string;
  school?: any;
  pending?: boolean;
  onSaveSchool: (school: any) => void;
}

const DEFAULT_SCHOOL = {
  name: "",
  postcode: "",
};

export const SchoolForm: React.FC<SchoolFormProps> = ({
  school = DEFAULT_SCHOOL,
  pending,
  onSaveSchool,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues: { ...school } });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveSchool)}
    >
      <div className="flex mb-8 w-full">
        <Input
          register={register}
          label="Name"
          type="text"
          name="name"
          placeholder="John Doe"
        />
      </div>
      <div className="flex mb-8">
        <Input
          register={register}
          label="postcode"
          name="postcode"
          type="text"
          placeholder="Postcode"
          width="w-1/2"
        />
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="submit"
          disabled={pending} // @TODO Check from react hook form
        >
          {pending ? <LoadingSpinner /> : "Save School"}
        </button>

        {/* {#if error !== undefined}
      <AlertErrorBox {error} />
    {/if} */}
      </div>
    </form>
  );
};
