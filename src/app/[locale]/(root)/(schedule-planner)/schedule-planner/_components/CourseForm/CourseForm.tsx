import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DaysMap } from 'utils/daysMap';
import { sectionTypeMap } from 'utils/sectionTypeMap';

import ControlledInputText from '@/app/[locale]/_components/Controlled/ControlledInputText';
import ControlledSelect from '@/app/[locale]/_components/Controlled/ControlledSelect';
import ControlledTimeInput from '@/app/[locale]/_components/Controlled/ControlledTimeInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mantine/core';

import { courseCustomSchema, type CourseCustomSchemaType } from '../../schemas/courseCustom.schema';
import ControlledInputNumber from '@/app/[locale]/_components/Controlled/ControlledInputNumber';

interface Props {
    type: "create" | "edit";
    onFinish?: (data: CourseCustomSchemaType) => void;
    data?: CourseCustomSchemaType;
    isLoading?: boolean;
}

export default function CourseForm(props: Props) {
    const t = useTranslations()
    const {
        control,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<CourseCustomSchemaType>({
        resolver: zodResolver(courseCustomSchema),
        defaultValues: {
            section_type: "lecture",
            credit: 3,
        }
    });

    const onFinish = (data: CourseCustomSchemaType) => {
        console.log(data);
        props.onFinish?.(data);
    };

    useEffect(() => {
        if (props.data) {
            setValue("uuid", props.data.uuid);
            setValue("subject_code", props.data.subject_code);
            setValue("credit", props.data.credit);
            setValue("section_code", props.data.section_code);
            setValue("section_type", props.data.section_type);
            setValue("subject_name_en", props.data.subject_name_en);
            setValue("subject_name_th", props.data.subject_name_th);
            setValue("time_from", props.data.time_from);
            setValue("teacher_name", props.data.teacher_name);
            setValue("room", props.data.room);
            setValue("time_to", props.data.time_to);
            setValue("day", props.data.day);
        }
        // setValue("subject_code", "104001");
        // setValue("credit", 3);
        // setValue("section_code", "1");
        // setValue("section_type", "lecture");
        // setValue("subject_name_en", "Computer Programming");
        // setValue("subject_name_th", "การเขียนโปรแกรมคอมพิวเตอร์");
        // setValue("teacher_name", "John Doe");
        // setValue("room", "Room 101");
        // setValue("time_from", "08:00");
        // setValue("time_to", "10:00");
        // setValue("day", "MON");
    }, [props.data, setValue]);

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
            <div className="flex flex-row gap-2">
                <ControlledInputText
                    control={control}
                    name="subject_code"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.subject_code.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.subject_code.placeholder"),
                        required: true,
                        size: "md",
                    }}
                />
                <ControlledInputNumber
                    control={control}
                    name="credit"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.credit.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.credit.placeholder"),
                        required: true,
                        size: "md",
                    }}
                />
            </div>
            <div className="flex flex-row gap-2">
                <ControlledInputText
                    control={control}
                    name="section_code"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.section_code.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.section_code.placeholder"),
                        required: true,
                        size: "md",
                    }}
                />
                <ControlledSelect
                    control={control}
                    name="section_type"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.section_type.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.section_type.placeholder"),
                        required: true,
                        allowDeselect: false,
                        data: sectionTypeMap.map((section) => ({
                            value: section.key,
                            label: t(`common.mask.subject.section_type`, {
                                section_type_th: section.th,
                                section_type_en: section.en,
                            }),
                        })),
                        size: "md",
                    }}
                />
            </div>
            <ControlledInputText
                control={control}
                name="subject_name_en"
                props={{
                    label: t("schedule_planner.addCourse.form.input.subject_name_en.label"),
                    placeholder: t("schedule_planner.addCourse.form.input.subject_name_en.placeholder"),
                    required: true,
                    size: "md",
                }}
            />
            <ControlledInputText
                control={control}
                name="subject_name_th"
                props={{
                    label: t("schedule_planner.addCourse.form.input.subject_name_th.label"),
                    placeholder: t("schedule_planner.addCourse.form.input.subject_name_th.placeholder"),
                    size: "md",
                }}
            />
            <div className="flex flex-row gap-2">
                <ControlledInputText
                    control={control}
                    name="teacher_name"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.teacher_name.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.teacher_name.placeholder"),
                        size: "md",
                    }}
                />
                <ControlledInputText
                    control={control}
                    name="room"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.room.label"),
                        placeholder: t("schedule_planner.addCourse.form.input.room.placeholder"),
                        size: "md",
                    }}
                />
            </div>
            <div className="flex flex-row gap-2">
                <ControlledTimeInput
                    control={control}
                    name="time_from"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.time_from.label"),
                        className: "w-full",
                        required: true,
                        size: "md",
                    }}
                />
                <ControlledTimeInput
                    control={control}
                    name="time_to"
                    props={{
                        label: t("schedule_planner.addCourse.form.input.time_to.label"),
                        className: "w-full",
                        required: true,
                        size: "md",
                    }}
                />
            </div>
            <ControlledSelect
                control={control}
                name="day"
                props={{
                    label: t("schedule_planner.addCourse.form.input.day.label"),
                    placeholder: t("schedule_planner.addCourse.form.input.day.placeholder"),
                    data: DaysMap.slice(0, 7).map((day) => ({
                        value: day.key,
                        label: t(`common.mask.subject.day`, {
                            th: day.th,
                            en: day.en,
                        }),
                    })),
                    searchable: true,
                    required: true,
                    size: "md",
                }}
            />
            <Button size='md' type="submit" loading={props.isLoading} color="blue" variant="light">
                {props.type === "create"
                    ? t("schedule_planner.addCourse.button.label")
                    : t("common.button.subject.save")}
            </Button>
        </form>
    )
}