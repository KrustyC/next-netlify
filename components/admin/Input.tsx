import type {
  RegisterOptions,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  error?: FieldError;
  hideErrorMessage?: boolean;
  type: string;
  placeholder: string;
  width?: string;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
}

export const Input: React.FC<InputProps> = ({
  width = "",
  name,
  hideErrorMessage = false,
  error,
  type,
  options = {},
  label,
  placeholder,
  register,
}) => {
  return (
    <div className={`flex flex-col ${width}`}>
      {label ? (
        <label className="uppercase block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      ) : null}
      <input
        id={name}
        {...register(name, options)}
        placeholder={placeholder}
        type={type}
        className={`${width} shadow appearance-none border ${
          error ? "border-red-500" : ""
        } rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />

      {error && !hideErrorMessage ? (
        <span className="text-red-500 text-xs mt-1">{error.message}</span>
      ) : null}
    </div>
  );
};
