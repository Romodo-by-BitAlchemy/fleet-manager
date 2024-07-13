//DatePickerValue.tsx
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

interface DatePickerProps {
  label: string;
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

const DatePickerValue: React.FC<DatePickerProps> = ({ label, selectedDate, onDateChange }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(selectedDate));

  const handleDateChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    onDateChange(newValue ? newValue.toDate() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          label={label}
          value={value}
          onChange={handleDateChange}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePickerValue;
