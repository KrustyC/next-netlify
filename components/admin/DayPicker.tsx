import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { format as dateFnsFormat } from "date-fns";

import "react-day-picker/lib/style.css";

interface DayPickerProps {
  value: string;
  onChange: (date: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
}

const CustomInput = React.forwardRef((props: any, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  );
});

CustomInput.displayName = "CustomInput";

const FORMAT = "dd/MM/yyyy";

export const DayPicker: React.FC<DayPickerProps> = ({
  value,
  onChange,
  onBlur,
}) => (
  <DayPickerInput
    value={value}
    placeholder="DD/MM/YYYY"
    format={FORMAT}
    component={CustomInput}
    formatDate={(date, format) => dateFnsFormat(date, format)}
    onDayChange={(date) => onChange(dateFnsFormat(date, FORMAT))}
    onBlur={onBlur}
  />
);
