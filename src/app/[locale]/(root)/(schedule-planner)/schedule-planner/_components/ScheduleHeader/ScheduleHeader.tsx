"use client";

import saveAs from 'file-saver';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

import ChangeThemeTable from '@/app/[locale]/_components/ChangeThemeTable/ChangeThemeTable';
import { useTableTheme } from '@/app/[locale]/_store/useTableTheme';
import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { type DownloadInput } from '@/services/download/_schema/download.schema';
import { api } from '@/trpc/react';
import { Button, Menu, Modal, rem, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconDownload, IconFileTypePdf, IconPlus, IconReceipt } from '@tabler/icons-react';

import useCoursePlanningStore from '../../_store/useCoursePlanningStore';
import {
    courseCustomSchemaToStore, type CourseCustomSchemaType
} from '../../schemas/courseCustom.schema';
import CourseForm from '../CourseForm/CourseForm';

export default function ScheduleHeader() {
    const t = useTranslations()
    const tableTheme = useTableTheme()
    const [addCourseOpened, { open: addCourseOpen, close: addCourseClose }] = useDisclosure(false);
    const { data: session } = useSession();
    const getCapture = api.download.getCapture.useMutation();
    const getReceipt = api.download.getReceipt.useMutation();
    const getPDF = api.download.getPdf.useMutation();

    const { courses, getCourses, addCourse } = useCoursePlanningStore();
    const hasCourses = courses.length > 0;

    const downloadPayload: DownloadInput = {
        courseData: JSON.stringify(getCourses()),
        major: `${session?.user.student.majorCode} - ${session?.user.student.majorNameEn}`,
        theme: tableTheme.currentTheme
    }

    const onAddCourse = (data: CourseCustomSchemaType) => {
        const course = courseCustomSchemaToStore.parse(data);
        addCourse([course]);
        addCourseClose();
    }

    const onDownloadPNG = () => {
        if (!hasCourses) return;
        const noti = notifications.show(LoadingNotificationData)
        getCapture.mutate(downloadPayload, {
            onSuccess: (data) => {
                notifications.update({ id: noti, ...SuccessNotificationData });
                saveAs(data, "schedule.png");
            },
            onError: (error) => {
                if (error instanceof Error) {
                    notifications.update({ id: noti, ...ErrorNotificationData, message: error.message });
                }
            }
        });
    }

    const onDownloadPDF = () => {
        if (!hasCourses) return;
        const noti = notifications.show(LoadingNotificationData)
        getPDF.mutate(downloadPayload, {
            onSuccess: (data) => {
                notifications.update({ id: noti, ...SuccessNotificationData });
                saveAs(data, "schedule.pdf");
            },
            onError: (error) => {
                if (error instanceof Error) {
                    notifications.update({ id: noti, ...ErrorNotificationData, message: error.message });
                }
            }
        })
    }

    const onDownloadReceipt = () => {
        if (!hasCourses) return;
        const noti = notifications.show(LoadingNotificationData)
        getReceipt.mutate(downloadPayload, {
            onSuccess: (data) => {
                notifications.update({ id: noti, ...SuccessNotificationData });
                saveAs(data, "receipt.png");
            },
            onError: (error) => {
                if (error instanceof Error) {
                    notifications.update({ id: noti, ...ErrorNotificationData, message: error.message });
                }
            }
        })
    }


    return (
        <>
            <Modal opened={addCourseOpened} onClose={addCourseClose} title={t("schedule_planner.addCourse.modal.title")} size="lg">
                <CourseForm type="create" onFinish={onAddCourse} />
            </Modal>
            <div className="flex flex-col">
                <Text size="xl" fw={700}>
                    {t("schedule_planner.title")}
                </Text>
                <div className='flex flex-col md:flex-row gap-2 md:justify-between'>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <ChangeThemeTable />
                        <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                                <Button disabled={!hasCourses} leftSection={<IconDownload size={15} />}>{t("common.button.download")}</Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Label>{t("common.button.downloadOptions")}</Menu.Label>
                                <Menu.Item
                                    leftSection={
                                        <IconDownload style={{ width: rem(14), height: rem(14) }} />
                                    }
                                    onClick={onDownloadPNG}
                                >
                                    PNG
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconFileTypePdf style={{ width: rem(14), height: rem(14) }} />
                                    }
                                    onClick={onDownloadPDF}
                                >
                                    PDF
                                </Menu.Item>
                                <Menu.Item
                                    leftSection={
                                        <IconReceipt style={{ width: rem(14), height: rem(14) }} />
                                    }
                                    onClick={onDownloadReceipt}
                                >
                                    Receipt
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            variant="outline"
                            color="blue"
                            leftSection={
                                <IconPlus size={16} />
                            }
                            onClick={addCourseOpen}
                        >
                            {t("schedule_planner.addCourse.button.label")}
                        </Button>
                    </div>
                </div>
            </div>
        </>

    )
}