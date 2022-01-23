import { useForm } from "react-hook-form";
import { School } from "@/types/global";
import { Input } from "../Input";
import { LoadingSpinner } from "../LoadingSpinner";

interface SchoolFormProps {
  className?: string;
  school?: School;
  pending?: boolean;
  onSaveSchool: (school: School) => void;
}

const DEFAULT_SCHOOL: School = {
  name: "",
  postcode: "",
};

export const SchoolForm: React.FC<SchoolFormProps> = ({
  school = DEFAULT_SCHOOL,
  pending,
  onSaveSchool,
}) => {
  const {
    register,
    formState: { isDirty, errors, isValid },
    handleSubmit,
  } = useForm<School>({
    defaultValues: { ...school },
    mode: "onBlur",
  });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveSchool)}
    >
      <div className="flex mb-8 w-full">
        <Input
          register={register}
          options={{ required: "Please add a name for the school" }}
          error={errors.name}
          label="Name"
          type="text"
          name="name"
          placeholder="John Doe"
        />
      </div>
      <div className="flex mb-8">
        <Input
          register={register}
          options={{ required: "Please add a postcode" }}
          error={errors.postcode}
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
          disabled={pending || !isValid || !isDirty}
        >
          {pending ? <LoadingSpinner /> : "Save School"}
        </button>
      </div>
    </form>
  );
};
