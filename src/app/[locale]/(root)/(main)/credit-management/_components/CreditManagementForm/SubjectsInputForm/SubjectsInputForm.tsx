"use client"

import { type Control, type Path, useFieldArray, useFormContext } from 'react-hook-form';

import {
    type CreditManagementSchemaType
} from '@/schemas/creditManagement/creditManagement.schema';
import { type SubjectSchemaType } from '@/schemas/creditManagement/subject.schema';
import { ActionIcon, Group, Stack, Table, Text } from '@mantine/core';
import { IconArrowBack, IconPencil, IconPlus, IconTrash, IconX } from '@tabler/icons-react';

import ControlledSearchSubject from '../SearchSubjectForm/SearchSubjectForm';
import ControlledInputNumber from '@/app/[locale]/_components/Controlled/ControlledInputNumber';
import CreditRender from './CreditRender/CreditRender';
import { useTranslations } from 'next-intl';

interface Props {
    control: Control<CreditManagementSchemaType>
    name: string
}

export default function SubjectsInputForm(props: Props) {
    const t = useTranslations()
    const { watch, setValue } = useFormContext<CreditManagementSchemaType>()

    const subjectsFields = useFieldArray({
        control: props.control,
        name: props.name as any,
    });

    return (
        <Stack>
            <div className='overflow-x-auto'>
                <Table className='min-w-fit' striped>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t("common.subject.code")}</Table.Th>
                            <Table.Th>{t("common.subject.name")}</Table.Th>
                            <Table.Th>{t("common.subject.credits")}</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {subjectsFields.fields.map((field, index) => {
                            const resultSubject = (watch(`${props.name}.${index}` as any) ?? null) as SubjectSchemaType | null;
                            return (
                                <Table.Tr key={field.id}>
                                    {(resultSubject && !resultSubject.isEdit) ?
                                        <>
                                            <Table.Td>
                                                <Text className='whitespace-nowrap'>{resultSubject.subjectCode}</Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <Text className='whitespace-nowrap'>
                                                    {t("common.mask.subject.subjectName", {
                                                        ...resultSubject
                                                    })}
                                                </Text>
                                            </Table.Td>
                                            <Table.Td>
                                                <CreditRender control={props.control} name={`${props.name}.${index}.credit` as Path<CreditManagementSchemaType>} resultSubject={resultSubject} />
                                            </Table.Td>
                                            <Table.Td>
                                                <Group gap={5} wrap='nowrap'>
                                                    <ActionIcon onClick={() => setValue(`${props.name}.${index}.isEdit` as any, true)}>
                                                        <IconPencil size={16} />
                                                    </ActionIcon>
                                                    <ActionIcon color="red" onClick={() => subjectsFields.remove(index)}>
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </>
                                        : <>
                                            <Table.Td>
                                                <ControlledSearchSubject control={props.control} name={`${props.name}.${index}` as Path<CreditManagementSchemaType>} />
                                            </Table.Td>
                                            <Table.Td></Table.Td>
                                            <Table.Td></Table.Td>
                                            <Table.Td>
                                                <Group gap={5}>
                                                    <ActionIcon disabled={resultSubject?.subjectCode === ""} onClick={() => setValue(`${props.name}.${index}.isEdit` as any, false)}>
                                                        <IconArrowBack size={16} />
                                                    </ActionIcon>
                                                    <ActionIcon color="red" onClick={() => subjectsFields.remove(index)}>
                                                        <IconTrash size={16} />
                                                    </ActionIcon>
                                                </Group>
                                            </Table.Td>
                                        </>}
                                </Table.Tr>
                            )
                        }
                        )}

                    </Table.Tbody>
                    <Table.Tfoot mt={5}>
                        <Table.Td>
                            <ActionIcon onClick={() => subjectsFields.append({
                                credit: 0,
                                subjectCode: "",
                                subjectNameEn: "",
                                subjectNameTh: "",
                                isEdit: true,
                            })}>
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Table.Td>
                    </Table.Tfoot>
                </Table>
            </div>

        </Stack>

    )
}