import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface TimePeriodSelectorProps {
  name: string;
  className?: string;
  register: UseFormRegister<any>;
  options?: RegisterOptions;
}

const PERIODS = ["AM", "PM"];

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  name,
  className,
  register,
  options,
}) => (
  <select
    className={`form-select shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
    {...register(name, options)}
  >
    {PERIODS.map((period) => (
      <option key={period} value={period}>
        {period}
      </option>
    ))}
  </select>
);
