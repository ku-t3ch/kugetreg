import React from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import { Textarea, type TextareaProps } from '@mantine/core';

interface ControlledInputTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: TextareaProps;
}

const ControlledInputTextarea = <T extends FieldValues>(
  props: ControlledInputTextareaProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <Textarea
              {...props.props}
              error={error ? error.message : undefined}
              onWheel={(e) => e.currentTarget.blur()}
              ref={ref}
              size="sm"
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

export default ControlledInputTextarea;
