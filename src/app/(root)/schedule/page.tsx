"use client";
import clsx from 'clsx';
import { useEffect } from 'react';
import dayColors from 'utils/dayColors';

import TableCourse from '@/app/_components/TableCourse/TableCourse';
import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { api } from '@/trpc/react';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { Button, Group, Skeleton, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCopy } from '@tabler/icons-react';

import useCourseStore from './_store/useCourseStore';

export default function Page() {
    const getGroupCourse = api.stdProfile.getGroupCourse.useQuery();
    const hasCourse = getGroupCourse.data?.results && getGroupCourse.data?.results.length > 0;
    const { setCourses } = useCourseStore();

    useEffect(() => {
        if (hasCourse && getGroupCourse.data?.results[0]?.course) {
            setCourses(getGroupCourse.data?.results[0]?.course);
        }
    }, [setCourses, getGroupCourse.data?.results, hasCourse]);

    const onCopySubjectName = async (subjectName: string) => {
        const key = notifications.show(LoadingNotificationData)
        try {
            await navigator.clipboard.writeText(subjectName);
            notifications.update({
                ...SuccessNotificationData,
                id: key,
                message: "Copied to clipboard :" + subjectName,
                color: "green",
            })
        } catch (error) {
            if (error instanceof Error) {
                notifications.update({
                    ...ErrorNotificationData,
                    id: key,
                    message: "Failed to copy to clipboard :" + error.message,
                    color: "red",
                })
            }
        }
    }

    const onShowDetail = (course: Course) => {
        modals.open({
            title: <div className="flex gap-2 items-center justify-between w-full">
                <Text size="xl" fw={700}>{course.subject_code}</Text>
                <Text size="md" fw={600} c={"dimmed"}>[{course.section_type_en}]</Text>
            </div>,
            children: <Stack gap={"sm"}>
                <Stack gap={0}>
                    <Text size="lg" fw={500}>{course.subject_name_th}</Text>
                    <Text size="lg" fw={500}>{course.subject_name_en}</Text>
                </Stack>
                <Stack gap={0}>
                    <Group gap={5}>
                        <Text size="sm" fw={700}>Day :</Text>
                        <Text size="sm" fw={400}>
                            <span className={clsx(dayColors[course.day_w.trim()]?.text)}>
                                {course.day_w}
                            </span>
                        </Text>
                    </Group>
                    <Group gap={5}>
                        <Text size="sm" fw={700}>Room :</Text>
                        <Text size="sm" fw={400}>{course.room_name_en}</Text>
                    </Group>
                    <Group gap={5}>
                        <Text size="sm" fw={700}>Section :</Text>
                        <Text size="sm" fw={400}>{course.section_code}</Text>
                    </Group>
                    <Group gap={5}>
                        <Text size="sm" fw={700}>Time :</Text>
                        <Text size="sm" fw={400}>{course.time_from} - {course.time_to}</Text>
                    </Group>
                </Stack>
                <Stack gap={0}>
                    <Text size="sm" fw={700}>Teacher :</Text>
                    {course.teacher_name_en.split(",").map((teacher, i) => (
                        <Text size="sm" fw={400} key={i}>- {teacher}</Text>
                    ))}
                </Stack>
                <div>
                    <Button size='xs' variant='light' onClick={() => onCopySubjectName(`${course.subject_code} ${course.subject_name_en}`)} leftSection={<IconCopy size={16} />}>Subject Name</Button>
                </div>
            </Stack>,
        })
    }

    return (
        <div className="overflow-x-auto">
            {getGroupCourse.isPending ? <div className="flex flex-col gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div className="flex items-center gap-1" key={i}>
                        <Skeleton height={80} width="20%" />
                        <Skeleton height={80} width="80%" />
                    </div>
                ))}
            </div> : <>
                {getGroupCourse.data?.results &&
                    getGroupCourse.data?.results.length > 0 &&
                    getGroupCourse.data?.results[0]?.course ? (
                    <TableCourse canClick onClick={onShowDetail} scheduleData={getGroupCourse.data?.results[0]?.course} />
                ) : (
                    <Text c={"dimmed"}>ไม่พบรายวิชา หรืออาจจะยังไม่ได้ลงทะเบียน</Text>
                )}
            </>}
        </div>
    );
}
