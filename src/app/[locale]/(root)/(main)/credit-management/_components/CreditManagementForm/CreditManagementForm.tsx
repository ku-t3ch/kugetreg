"use client";
import { type FormProps } from "@/types/FormProps.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Center, Group, Paper, RingProgress, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { creditManagementSchema, type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";
import GeneralEducationForm from "./GeneralEducationForm/GeneralEducationForm";
import SpecificCoursesForm from "./SpecificCoursesForm/SpecificCoursesForm";
import FreeElectiveForm from "./FreeElectiveForm/FreeElectiveForm";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { useMediaQuery } from "@mantine/hooks";

export default function CreditManagementForm(props: FormProps<CreditManagementSchemaType>) {
    const t = useTranslations();
    const isMobile = useMediaQuery("(max-width: 1057px)");
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

    const generalEducationWatch = useWatch({
        control,
        name: "general_education",
    })

    const specificCoursesWatch = useWatch({
        control,
        name: "specific_courses",
    })

    const freeElectiveWatch = useWatch({
        control,
        name: "free_elective",
    })

    const totalCreditGeneralEducation = _.sumBy(generalEducationWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditGeneralEducation = _.sumBy(generalEducationWatch, (x) => x.minCredit)
    const percentGeneralEducation = ((totalCreditGeneralEducation / requiredCreditGeneralEducation) * 100) || 0

    const totalCreditSpecificCourses = _.sumBy(specificCoursesWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditSpecificCourses = _.sumBy(specificCoursesWatch, (x) => x.minCredit)
    const percentSpecificCourses = ((totalCreditSpecificCourses / requiredCreditSpecificCourses) * 100) || 0

    const totalCreditFreeElective = _.sumBy(freeElectiveWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditFreeElective = _.sumBy(freeElectiveWatch, (x) => x.minCredit)
    const percentFreeElective = ((totalCreditFreeElective / requiredCreditFreeElective) * 100) || 0

    return (
        <FormProvider {...methods}>
            <Stack>
                <Group justify="space-between">
                    <Text size="xl" fw={600}>
                        {t("credit_management.title")}
                    </Text>
                    <Button onClick={handleSubmit(onFinish)} leftSection={<IconDeviceFloppy size={16} />} variant="light">
                        {t("common.button.subject.save")}
                    </Button>
                </Group>
                <Group wrap={isMobile ? "wrap" : "nowrap"}>
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <RingProgress
                                size={80}
                                roundCaps
                                thickness={8}
                                sections={[{ value: percentGeneralEducation, color: "blue" }]}
                                label={
                                    <Center>
                                        <Text size="xs" fw={700}>
                                            {percentGeneralEducation.toFixed(0)}%
                                        </Text>
                                    </Center>
                                }
                            />

                            <div>
                                <Text c="dimmed" fw={700}>
                                    {t("credit_management.general_education")}
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditGeneralEducation}/{requiredCreditGeneralEducation}
                                    </Text>
                                    <Text size="sm" c="dimmed">{t("common.subject.credits")}</Text>
                                </Group>
                            </div>
                        </Group>
                    </Paper>
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <RingProgress
                                size={80}
                                roundCaps
                                thickness={8}
                                sections={[{ value: percentSpecificCourses, color: "green" }]}
                                label={
                                    <Center>
                                        <Text size="xs" fw={700}>
                                            {percentSpecificCourses.toFixed(0)}%
                                        </Text>
                                    </Center>
                                }
                            />

                            <div>
                                <Text c="dimmed" fw={700}>
                                    {t("credit_management.specific_courses")}
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditSpecificCourses}/{requiredCreditSpecificCourses}
                                    </Text>
                                    <Text size="sm" c="dimmed">{t("common.subject.credits")}</Text>
                                </Group>
                            </div>
                        </Group>
                    </Paper>
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <RingProgress
                                size={80}
                                roundCaps
                                thickness={8}
                                sections={[{ value: percentFreeElective, color: "yellow" }]}
                                label={
                                    <Center>
                                        <Text size="xs" fw={700}>
                                            {percentFreeElective.toFixed(0)}%
                                        </Text>
                                    </Center>
                                }
                            />

                            <div>
                                <Text c="dimmed" fw={700}>
                                    {t("credit_management.free_elective")}
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditFreeElective}/{requiredCreditFreeElective}
                                    </Text>
                                    <Text size="sm" c="dimmed">{t("common.subject.credits")}</Text>
                                </Group>
                            </div>
                        </Group>
                    </Paper>
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