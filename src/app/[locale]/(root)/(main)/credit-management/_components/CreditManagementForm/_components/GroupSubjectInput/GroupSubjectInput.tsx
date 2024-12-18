"use client"

import { useTranslations } from 'next-intl';
import { type Control, type Path } from 'react-hook-form';

import ControlledInputNumber from '@/app/[locale]/_components/Controlled/ControlledInputNumber';
import ControlledInputText from '@/app/[locale]/_components/Controlled/ControlledInputText';
import { type CreditManagementSchemaType } from '@/schemas/creditManagement/creditManagement.schema';
import { useMediaQuery } from '@mantine/hooks';

interface Props {
    control: Control<CreditManagementSchemaType>
    name: Path<CreditManagementSchemaType>
}

export default function GroupSubjectInput(props: Props) {
    const t = useTranslations()
    const isMobile = useMediaQuery("(max-width: 768px)");
    return (
        <>
            <ControlledInputText
                name={`${props.name}.groupName` as Path<CreditManagementSchemaType>}
                control={props.control}
                props={{
                    placeholder: t("credit_management.groupName.input.label"),
                    w: "100%",
                    maw: 300,
                    label: t("credit_management.groupName.input.label")
                }}
            />
            <ControlledInputNumber
                name={`${props.name}.minCredit` as Path<CreditManagementSchemaType>}
                control={props.control}
                props={{
                    placeholder: t("credit_management.minCredit.input.label"),
                    w: "100%",
                    maw: isMobile ? 300 : 200,
                    label: t("credit_management.minCredit.input.label")
                }}
            />
        </>
    )
}