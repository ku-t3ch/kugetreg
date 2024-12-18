"use client";
import { type FormProps } from "@/types/FormProps.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { creditManagementSchema, type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";
import GeneralEducationForm from "./GeneralEducationForm/GeneralEducationForm";
import SpecificCoursesForm from "./SpecificCoursesForm/SpecificCoursesForm";
import FreeElectiveForm from "./FreeElectiveForm/FreeElectiveForm";
import { IconCloudUpload } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export default function CreditManagementForm(props: FormProps<CreditManagementSchemaType>) {
    const t = useTranslations();
    const methods = useForm<CreditManagementSchemaType>({
        resolver: zodResolver(creditManagementSchema),
    });

    const {
        control,
        setValue,
        handleSubmit,
    } = methods;

    const onFinish = (data: CreditManagementSchemaType) => {
        console.log(data);
        props.onFinish?.(data);
    };

    useEffect(() => {
        if (props.data) {
            setValue("general_education", props.data.general_education);
            setValue("free_elective", props.data.free_elective);
            setValue("specific_courses", props.data.specific_courses);
        }
    }, [props.data, setValue]);

    return (
        <FormProvider {...methods}>
            <Stack>
                <Group justify="space-between">
                    <Text size="xl" fw={600}>
                        {t("credit_management.title")}
                    </Text>
                    <Button onClick={handleSubmit(onFinish)} leftSection={<IconCloudUpload size={16} />} variant="light">
                        {t("common.button.subject.save")}
                    </Button>
                </Group>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
                    <Card withBorder>
                        <GeneralEducationForm control={control} />
                    </Card>
                    <Card withBorder>
                        <SpecificCoursesForm control={control} />
                    </Card>
                    <Card withBorder>
                        <FreeElectiveForm control={control} />
                    </Card>
                </form>
            </Stack>
        </FormProvider>

    )
}