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
import { useTranslations } from 'next-intl';
import GroupSubjectInput from '../GroupSubjectInput/GroupSubjectInput';

interface Props {
    control: Control<CreditManagementSchemaType>
}

export default function GeneralEducationForm(props: Props) {
    const t = useTranslations()
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { control } = props;
    const { setValue, watch } = useFormContext<CreditManagementSchemaType>()
    const generalEducationFields = useFieldArray({
        control,
        name: "general_education",
    });

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw="bold" size="lg">หมวดวิชาศึกษาทั่วไป</Text>
            </Group>
            {generalEducationFields.fields.map((field, index) => {
                const generalEducationField = watch(`general_education.${index}`);
                return (
                    <Paper withBorder p="sm" key={field.id}>
                        <Stack>
                            <Group justify="space-between">
                                {generalEducationField.isEdit ? <Group gap={"sm"} wrap={isMobile ? "wrap" : "nowrap"}>
                                    <GroupSubjectInput control={control} name={`general_education.${index}`} />
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
                                    {generalEducationField.isEdit ? <ActionIcon onClick={() => setValue(`general_education.${index}.isEdit`, false)}>
                                        <IconDeviceFloppy size={16} />
                                    </ActionIcon> : <ActionIcon onClick={() => setValue(`general_education.${index}.isEdit`, true)}>
                                        <IconPencil size={16} />
                                    </ActionIcon>
                                    }

                                    <ActionIcon color="red" onClick={() => generalEducationFields.remove(index)}>
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                            <Progress size="sm" value={_.sumBy(generalEducationField.subjects, (x) => x.credit) / generalEducationField.minCredit * 100} />
                            <SubjectsInputForm control={control} name={`general_education.${index}.subjects`} />
                        </Stack>
                    </Paper>
                )
            })}
            <ActionIcon onClick={() => generalEducationFields.append({ groupName: "", minCredit: 0, subjects: [], isEdit: true })}>
                <IconPlus size={16} />
            </ActionIcon>
        </Stack>
    )
}