import 'dayjs/locale/th';

import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

import {
    DatesProvider, type DatesRangeValue, DateTimePicker, type DateTimePickerProps, type DateValue
} from '@mantine/dates';

interface ControlledDateTimePickerProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    props?: DateTimePickerProps;
}

const ControlledDateTimePicker = <T extends FieldValues>(
    props: ControlledDateTimePickerProps<T>,
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
                        <DateTimePicker
                            valueFormat="วันddddที่ DD MMMM YYYY HH:mm"
                            error={error ? error.message : undefined}
                            value={value}
                            onChange={handleOnChange}
                            {...props.props}
                        />
                    </DatesProvider>
                );
            }}
        />
    );
};

export default ControlledDateTimePicker;
