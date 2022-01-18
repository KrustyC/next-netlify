import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  width?: string;
  options?: RegisterOptions;
  register: UseFormRegister<any>;
}

export const Input: React.FC<InputProps> = ({
  width = "",
  name,
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
        className={`${width} shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
    </div>
  );
};
