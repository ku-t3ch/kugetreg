import {
  type FieldValues,
  type Path,
  type Control,
  Controller,
} from "react-hook-form";
import { Switch, type SwitchProps } from "@mantine/core";
import React from "react";

interface ControlledSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: SwitchProps;
}

const ControlledSwitch = <T extends FieldValues>(
  props: ControlledSwitchProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        return (
          <>
            <Switch
              error={error?.message}
              {...props.props}
              checked={value}
              onChange={onChange}
            />
          </>
        );
      }}
    />
  );
};

export default ControlledSwitch;
