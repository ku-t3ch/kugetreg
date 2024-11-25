"use client";

import saveAs from 'file-saver';
import { useSession } from 'next-auth/react';

import { ErrorNotificationData, LoadingNotificationData, SuccessNotificationData } from '@/configs/common/NotificationData/NotificationData';
import { type DownloadInput } from '@/services/download/_schema/download.schema';
import { api } from '@/trpc/react';
import { Button, Group, Menu, Modal, rem, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload, IconFileTypePdf, IconPlus, IconReceipt } from '@tabler/icons-react';
import useCourseStore from '../../_store/useCourseStore';
import { useDisclosure } from '@mantine/hooks';

export default function ScheduleHeader() {
    const { data: session } = useSession();
    const getCapture = api.download.getCapture.useMutation();
    const getReceipt = api.download.getReceipt.useMutation();
    const getPDF = api.download.getPdf.useMutation();

    const { courses } = useCourseStore();
    const hasCourses = courses.length > 0;

    const downloadPayload: DownloadInput = {
        courseData: JSON.stringify(courses),
        screenType: "desktop",
        major: `${session?.user.student.majorCode} - ${session?.user.student.majorNameEn}`,
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

    const [openedAddCourse, { open: openAddCourse, close: closeAddCourse }] = useDisclosure(false);

    return (
        <>
            <Modal opened={openedAddCourse} onClose={closeAddCourse} title="">
                asdfsdf
            </Modal>
            <div className="flex items-center justify-between">
                <Text size="xl" fw={700}>
                    วางแผนตารางเรียน
                </Text>
                <Group gap={"sm"}>
                    <Menu shadow="md" width={200} position="bottom-end">
                        <Menu.Target>
                            <Button disabled={!hasCourses} leftSection={<IconDownload size={15} />}>Download</Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Label>Download Options</Menu.Label>
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
                    <div>
                        <Button onClick={openAddCourse} leftSection={<IconPlus size={15} />} >Add Course</Button>
                    </div>
                </Group>
            </div>
        </>

    )
}