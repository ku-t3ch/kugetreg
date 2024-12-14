import React from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import { MultiSelect, type MultiSelectProps } from '@mantine/core';

interface ControlledMultiSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: MultiSelectProps;
}

const ControlledMultiSelect = <T extends FieldValues>(
  props: ControlledMultiSelectProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <MultiSelect
              error={error?.message}
              onChange={onChange}
              value={value}
              {...props.props}
              className="w-full"
            />
          </>
        );
      }}
    />
  );
};

export default ControlledMultiSelect;
