/* eslint-disable @typescript-eslint/no-base-to-string */
"use client";
import _ from 'lodash';
import { type Control, useFieldArray, useFormContext } from 'react-hook-form';

import ControlledInputNumber from '@/app/[locale]/_components/Controlled/ControlledInputNumber';
import ControlledInputText from '@/app/[locale]/_components/Controlled/ControlledInputText';
import {
    type CreditManagementSchemaType
} from '@/schemas/creditManagement/creditManagement.schema';
import { ActionIcon, Badge, Group, Paper, Progress, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDeviceFloppy, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

import SubjectsInputForm from '../SubjectsInputForm/SubjectsInputForm';

interface Props {
    control: Control<CreditManagementSchemaType>
}

export default function SpecificCoursesForm(props: Props) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { control } = props;
    const { setValue, watch } = useFormContext<CreditManagementSchemaType>()
    const specificCoursesFields = useFieldArray({
        control,
        name: "specific_courses",
    });

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw="bold" size="lg">หมวดวิชาเฉพาะ</Text>
                <ActionIcon onClick={() => specificCoursesFields.append({ groupName: "", minCredit: 0, subjects: [], isEdit: true })}>
                    <IconPlus size={16} />
                </ActionIcon>
            </Group>
            {specificCoursesFields.fields.map((field, index) => {
                const generalEducationField = watch(`specific_courses.${index}`) ?? null;
                return (
                    <Paper withBorder p="sm" key={field.id}>
                        <Stack>
                            <Group justify="space-between">
                                {(generalEducationField.isEdit) ? <Group gap={"sm"} wrap={isMobile ? "wrap" : "nowrap"}>
                                    <ControlledInputText
                                        name={`specific_courses.${index}.groupName`}
                                        control={control}
                                        props={{
                                            placeholder: "ชื่อหมวดวิชา",
                                            w: "100%",
                                            maw: 300,
                                            label: "ชื่อหมวดวิชา"
                                        }}
                                    />
                                    <ControlledInputNumber
                                        name={`specific_courses.${index}.minCredit`}
                                        control={control}
                                        props={{
                                            placeholder: "กรอกจำนวนหน่วยกิตที่ต้องการ",
                                            w: "100%",
                                            maw: isMobile ? 300 : 200,
                                            label: "จำนวนหน่วยกิตที่ต้องการ"
                                        }}
                                    />
                                </Group> : <Group>
                                    <Badge
                                        size="xl"
                                        variant="light"
                                    >
                                       {_.sumBy(generalEducationField.subjects, (x) => x.credit)}  / {generalEducationField.minCredit}
                                    </Badge>
                                    <Text size="md" fw={700}>{generalEducationField.groupName}</Text>
                                </Group>
                                }

                                <Group gap={5}>
                                    {generalEducationField.isEdit ? <ActionIcon onClick={() => setValue(`specific_courses.${index}.isEdit`, false)}>
                                        <IconDeviceFloppy size={16} />
                                    </ActionIcon> : <ActionIcon onClick={() => setValue(`specific_courses.${index}.isEdit`, true)}>
                                        <IconPencil size={16} />
                                    </ActionIcon>
                                    }

                                    <ActionIcon color="red" onClick={() => specificCoursesFields.remove(index)}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                            <Progress size="sm" value={_.sumBy(generalEducationField.subjects, (x) => x.credit) / generalEducationField.minCredit * 100} />
                            <SubjectsInputForm control={control} name={`specific_courses.${index}.subjects`} />
                        </Stack>
                    </Paper>
                )
            })}
        </Stack>
    )
}