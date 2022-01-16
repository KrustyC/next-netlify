import { useForm } from "react-hook-form";
import { TextInput } from "../TextInput";
import { LoadingSpinner } from "../LoadingSpinner";

interface TrusteeFormProps {
  className?: string;
  trustee?: any;
  pending?: boolean;
  onSaveTrustee: (trustee: any) => void;
}

const DEFAULT_TRUSTEE = {
  name: "",
};

export const TrusteeForm: React.FC<TrusteeFormProps> = ({
  trustee = DEFAULT_TRUSTEE,
  pending,
  onSaveTrustee,
}) => {
  const { register, handleSubmit } = useForm({ defaultValues: { ...trustee } });

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onSaveTrustee)}
    >
      <div className="flex mb-8 w-full">
        <TextInput
          register={register}
          label="Name"
          name="name"
          placeholder="John Doe"
        />
      </div>

      <div className="flex items-center border-t-2 border-slate-300 pt-4 h-24">
        <button
          className="btn-admin btn-primary mr-4"
          type="submit"
          disabled={pending} // @TODO Check from react hook form
        >
          {pending ? <LoadingSpinner /> : "Save Trustee"}
        </button>

        {/* {#if error !== undefined}
      <AlertErrorBox {error} />
    {/if} */}
      </div>
    </form>
  );
};