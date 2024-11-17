"use client";
import { useSession } from 'next-auth/react';

import { type DownloadInput } from '@/services/download/_schema/download.schema';
import { api } from '@/trpc/react';
import { Button, Menu, rem, Text } from '@mantine/core';
import { IconDownload, IconFileTypePdf, IconReceipt } from '@tabler/icons-react';

import useCourseStore from './_store/useCourseStore';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        getCapture.mutate(downloadPayload, {
            onSuccess: (data) => {
                console.log(data);
            }
        });
        console.log("Download PNG");
    }

    const onDownloadPDF = () => {
        if (!hasCourses) return;
        getPDF.mutate(downloadPayload);
        console.log("Download PDF");
    }

    const onDownloadReceipt = () => {
        if (!hasCourses) return;
        getReceipt.mutate(downloadPayload);
        console.log("Download Receipt");
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <Text size="xl" fw={600}>
                    ตารางเรียน
                </Text>
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
                        >
                            PDF
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <IconReceipt style={{ width: rem(14), height: rem(14) }} />
                            }
                        >
                            Receipt
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </div>
            {children}
        </div>
    );
}
