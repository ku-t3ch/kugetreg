import React from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

import { InputBase, type InputBaseProps, type PolymorphicComponentProps } from '@mantine/core';

interface ControlledInputBaseProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: PolymorphicComponentProps<"input", InputBaseProps>;
  mask?: string;
}

const ControlledInputBase = <T extends FieldValues>(
  props: ControlledInputBaseProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        const onChangeValue = (value: string) => {
          if (value === "" || value === null || value === undefined) {
            onChange(undefined);
          } else {
            onChange(value);
          }
        };

        return (
          <>
            <InputBase
              error={error ? error.message : undefined}
              onWheel={(e) => e.currentTarget.blur()}
              {...props.props}
              mask={props.mask}
              component={IMaskInput}
              ref={ref}
              value={value}
              onChange={(e) => {
                onChangeValue(e.currentTarget.value);
              }}
              className="w-full"
            />
          </>
        );
      }}
    />
  );
};

export default ControlledInputBase;
