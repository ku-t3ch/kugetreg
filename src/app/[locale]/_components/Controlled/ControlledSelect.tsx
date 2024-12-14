import clsx from 'clsx';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import { Select, type SelectProps } from '@mantine/core';

interface ControlledSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: SelectProps;
}

const ControlledSelect = <T extends FieldValues>(
  props: ControlledSelectProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <Select
            error={error?.message}
            onChange={onChange}
            value={value}
            {...props.props}
          />
        );
      }}
    />
  );
};

export default ControlledSelect;
