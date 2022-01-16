interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  width?: string;
  register: any;
}

export const TextInput: React.FC<TextInputProps> = ({
  width = "",
  name,
  label,
  placeholder,
  register,
}) => {
  return (
    <div className={`flex flex-col ${width}`}>
      <label className="uppercase block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        type="text"
        className={`${width} shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
    </div>
  );
};
