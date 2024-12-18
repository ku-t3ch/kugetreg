/* eslint-disable @typescript-eslint/no-base-to-string */
"use client";
import _ from 'lodash';
import { type Control, useFieldArray, useFormContext } from 'react-hook-form';

import {
    type CreditManagementSchemaType
} from '@/schemas/creditManagement/creditManagement.schema';
import { ActionIcon, Badge, Collapse, Group, Paper, Progress, Stack, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp, IconDeviceFloppy, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';

import SubjectsInputForm from '../_components/SubjectsInputForm/SubjectsInputForm';
import GroupSubjectInput from '../_components/GroupSubjectInput/GroupSubjectInput';
import { useTranslations } from 'next-intl';

interface Props {
    control: Control<CreditManagementSchemaType>
}

export default function SpecificCoursesForm(props: Props) {
    const t = useTranslations();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const { control } = props;
    const { setValue, watch } = useFormContext<CreditManagementSchemaType>()
    const specificCoursesFields = useFieldArray({
        control,
        name: "specific_courses",
    });
    const [opened, { toggle }] = useDisclosure(true);

    return (
        <Stack>
            <Group justify="space-between">
                <Text fw="bold" size="lg">{t("credit_management.specific_courses")}</Text>
                <ActionIcon variant="subtle" size={"md"} onClick={toggle}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </Group>
            <Collapse in={opened}>
                <Stack>
                    {specificCoursesFields.fields.map((field, index) => {
                        const specificCoursesField = watch(`specific_courses.${index}`) ?? null;
                        return (
                            <Paper withBorder p="sm" key={field.id}>
                                <Stack>
                                    <Group justify="space-between">
                                        <Group align='center'>
                                            {specificCoursesField.isEdit ? <Group gap={"sm"} wrap={isMobile ? "wrap" : "nowrap"}>
                                                <GroupSubjectInput control={control} name={`specific_courses.${index}`} />
                                            </Group> : <Group>
                                                <Badge
                                                    size="xl"
                                                    variant="light"
                                                >
                                                    {_.sumBy(specificCoursesField.subjects, (x) => x.credit)}  / {specificCoursesField.minCredit}
                                                </Badge>
                                                <Text size="md" fw={700}>{specificCoursesField.groupName}</Text>
                                            </Group>
                                            }
                                            {specificCoursesField.isEdit ? <ActionIcon onClick={() => setValue(`specific_courses.${index}.isEdit`, false)}>
                                                <IconDeviceFloppy size={16} />
                                            </ActionIcon> : <ActionIcon onClick={() => setValue(`specific_courses.${index}.isEdit`, true)}>
                                                <IconPencil size={16} />
                                            </ActionIcon>
                                            }
                                        </Group>

                                        <Group gap={5}>
                                            <ActionIcon color="red" onClick={() => specificCoursesFields.remove(index)}>
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                    <Progress size="sm" value={_.sumBy(specificCoursesField.subjects, (x) => x.credit) / specificCoursesField.minCredit * 100} />
                                    <SubjectsInputForm control={control} name={`specific_courses.${index}.subjects`} />
                                </Stack>
                            </Paper>
                        )
                    })}
                    <ActionIcon onClick={() => specificCoursesFields.append({ groupName: "", minCredit: 0, subjects: [], isEdit: true })}>
                        <IconPlus size={16} />
                    </ActionIcon>
                </Stack>
            </Collapse>
        </Stack>
    )
}