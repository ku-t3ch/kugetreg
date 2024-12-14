import 'dayjs/locale/th';

import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import { type ComboboxData, type MantineSize } from '@mantine/core';
import { DatePickerInput, DatesProvider, type DatesRangeValue, type DateValue } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

interface ControlledDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  className?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  option?: ComboboxData;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  size?: MantineSize;
}

const ControlledDatePicker = <T extends FieldValues>(
  props: ControlledDatePickerProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleOnChange = (date: DateValue | DatesRangeValue | Date[]) => {
          onChange(date);
        };
        return (
          <DatesProvider
            settings={{
              locale: "th",
              timezone: "Asia/Bangkok",
            }}
          >
            <DatePickerInput
              withAsterisk={props.required}
              valueFormat="วันddddที่ DD MMMM YYYY"
              error={error ? error.message : undefined}
              disabled={props.disabled}
              placeholder={props.placeholder}
              label={props.label}
              value={value}
              size={props.size}
              onChange={handleOnChange}
              leftSection={<IconCalendar size={15} />}
              className={props.className}
              clearable={props.clearable}
            />
          </DatesProvider>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
