import React from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import { Checkbox, type CheckboxProps } from '@mantine/core';

interface ControlledCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: CheckboxProps;
}

const ControlledCheckbox = <T extends FieldValues>(
  props: ControlledCheckboxProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <Checkbox
              error={error ? error.message : undefined}
              {...props.props}
              ref={ref}
              value={value}
              onChange={onChange}
              className="w-full"
            />
          </>
        );
      }}
    />
  );
};

export default ControlledCheckbox;
