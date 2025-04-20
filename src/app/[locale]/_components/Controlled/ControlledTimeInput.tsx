import {
    type FieldValues,
    type Path,
    type Control,
    Controller,
} from "react-hook-form";
import { TimeInput, type TimeInputProps } from "@mantine/dates";
import { type ChangeEvent } from "react";

interface ControlledTimeInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    props?: TimeInputProps;
}

const ControlledTimeInput = <T extends FieldValues>(
    props: ControlledTimeInputProps<T>,
) => {
    return (
        <Controller
            rules={{ required: true }}
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                };
                return (
                    <TimeInput
                        {...props.props}
                        error={error ? error.message : undefined}
                        onChange={handleChange}
                        value={value}
                    />
                );
            }}
        />
    );
};

export default ControlledTimeInput;
