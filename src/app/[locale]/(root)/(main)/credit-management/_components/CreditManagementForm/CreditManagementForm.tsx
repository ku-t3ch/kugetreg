"use client";
import { type FormProps } from "@/types/FormProps.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Center, Group, Menu, Paper, rem, RingProgress, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { creditManagementSchema, type CreditManagementSchemaType } from "@/schemas/creditManagement/creditManagement.schema";
import GeneralEducationForm from "./GeneralEducationForm/GeneralEducationForm";
import SpecificCoursesForm from "./SpecificCoursesForm/SpecificCoursesForm";
import FreeElectiveForm from "./FreeElectiveForm/FreeElectiveForm";
import { IconDeviceFloppy, IconDownload, IconSettings, IconUpload } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import _ from "lodash";
import { useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { ErrorNotificationData, LoadingNotificationData, SuccessNotificationData } from "@/configs/common/NotificationData/NotificationData";
import { saveAs } from "file-saver";
import { api } from "@/trpc/react";

export default function CreditManagementForm(props: FormProps<CreditManagementSchemaType>) {
    const t = useTranslations();
    const isMobile = useMediaQuery("(max-width: 1057px)");

    const creditManagementPdf = api.download.getCreditManagementPdf.useMutation()

    const inputFileRef = useRef<HTMLInputElement>(null);
    const methods = useForm<CreditManagementSchemaType>({
        resolver: zodResolver(creditManagementSchema),
    });

    const {
        control,
        setValue,
        handleSubmit,
    } = methods;

    const onFinish = (data: CreditManagementSchemaType) => {
        props.onFinish?.(data);
    };

    useEffect(() => {
        if (props.data) {
            setValue("general_education", props.data.general_education);
            setValue("free_elective", props.data.free_elective);
            setValue("specific_courses", props.data.specific_courses);
        }
    }, [props.data, setValue]);

    const data = useWatch({
        control,
    })

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

    const onDownload = () => {
        saveAs(new Blob([JSON.stringify(data)], { type: "application/json" }), `credit_management_${new Date().getTime()}.json`);
    }

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = () => {
                try {
                    const content = creditManagementSchema.parse(JSON.parse(reader.result as string));
                    setValue("general_education", content.general_education);
                    setValue("free_elective", content.free_elective);
                    setValue("specific_courses", content.specific_courses);
                } catch (error) {
                    if (error instanceof Error) {
                        notifications.show({
                            ...ErrorNotificationData,
                            message: "Invalid file format",
                        })
                    }
                }
                e.target.value = '';
            };
        }
    }

    const onDownloadReport = () => {
        const keyNoti = notifications.show({ ...LoadingNotificationData, message: "Downloading..." })
        creditManagementPdf.mutate({
            payload: JSON.stringify(data)
        }, {
            onSuccess: (data) => {
                notifications.update({ id: keyNoti, ...SuccessNotificationData, message: "Download successfully", });
                saveAs(data, `credit_management_report_${new Date().getTime()}.pdf`);
            },
            onError: (error) => {
                if (error instanceof Error) {
                    notifications.update({ id: keyNoti, ...ErrorNotificationData, message: error.message });
                }
            }
        })
    }


    return (
        <FormProvider {...methods}>
            <input onChange={onUpload} ref={inputFileRef} type="file" style={{ display: "none" }} accept=".json" />
            <Stack>
                <Group justify="space-between">
                    <Text size="xl" fw={600}>
                        {t("credit_management.title")}
                    </Text>
                    <Group gap={5}>
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <Button leftSection={<IconSettings size={16} />} variant="light">
                                    {t("credit_management.preset.button.management")}
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={
                                        <IconDownload style={{ width: rem(14), height: rem(14) }} />
                                    }
                                    onClick={onDownload}
                                >
                                    {t("credit_management.preset.button.download")}
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconUpload style={{ width: rem(14), height: rem(14) }} />
                                    }
                                    onClick={() => inputFileRef.current?.click()}
                                >
                                    {t("credit_management.preset.button.upload")}
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                        <Button onClick={onDownloadReport} leftSection={<IconDownload size={16} />} variant="light">
                            {t("credit_management.button.downloadReport")}
                        </Button>
                        <Button onClick={handleSubmit(onFinish)} leftSection={<IconDeviceFloppy size={16} />} variant="light">
                            {t("common.button.subject.save")}
                        </Button>
                    </Group>
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