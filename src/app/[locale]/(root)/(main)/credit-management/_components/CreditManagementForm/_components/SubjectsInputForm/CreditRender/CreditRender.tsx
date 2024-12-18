"use client"

import { useState } from 'react';
import { type Control } from 'react-hook-form';

import ControlledInputNumber from '@/app/[locale]/_components/Controlled/ControlledInputNumber';
import {
    type CreditManagementSchemaType
} from '@/schemas/creditManagement/creditManagement.schema';
import { type SubjectSchemaType } from '@/schemas/creditManagement/subject.schema';
import { ActionIcon, Group, Text } from '@mantine/core';
import { IconArrowBack, IconPencil } from '@tabler/icons-react';

interface Props {
    control: Control<CreditManagementSchemaType>
    name: string
    resultSubject: SubjectSchemaType
}

export default function CreditRender(props: Props) {
    const [isEdit, setIsEdit] = useState(false)
    return (
        <Group gap={5}>
            {isEdit ? <>
                <ControlledInputNumber
                    name={props.name as any}
                    control={props.control}
                    props={{
                        placeholder: "กรอกจำนวนหน่วยกิต",
                        w: 100,
                    }}
                />
                <ActionIcon variant="transparent" onClick={() => setIsEdit(false)}>
                    <IconArrowBack size={16} />
                </ActionIcon>
            </> : <>
                <Text className='whitespace-nowrap'>
                    {props.resultSubject.credit}
                </Text>
                <ActionIcon variant="transparent" onClick={() => setIsEdit(true)}>
                    <IconPencil size={16} />
                </ActionIcon>
            </>}
        </Group>
    )
}