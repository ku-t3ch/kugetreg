import clsx from 'clsx';
import dayColors from 'utils/dayColors';

import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { Button, Group, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCopy } from '@tabler/icons-react';

interface Props {
    course: Course
}

function ModalCourseDetailTitle({ course }: Props) {
    return (
        <div className="flex gap-2 items-center justify-between w-full">
            <Text size="xl" fw={700}>{course.subject_code}</Text>
            {course.max_credit ? <Text size="md" fw={600} c={"dimmed"}>[{course.max_credit} Credit]</Text> : <Text size="md" fw={600} c={"dimmed"}>[{course.section_type_en}]</Text>}
        </div>
    )
}

function ModalCourseChildren({ course, actions }: Props & { actions?: React.ReactNode }) {
    const onCopySubjectName = async (subjectName: string) => {
        const key = notifications.show(LoadingNotificationData)
        try {
            await navigator.clipboard.writeText(subjectName);
            notifications.update({
                ...SuccessNotificationData,
                id: key,
                message: "Copied to clipboard : " + subjectName,
                color: "green",
            })
        } catch (error) {
            if (error instanceof Error) {
                notifications.update({
                    ...ErrorNotificationData,
                    id: key,
                    message: "Failed to copy to clipboard : " + error.message,
                    color: "red",
                })
            }
        }
    }
    return (
        <Stack gap={"sm"}>
            <Stack gap={0}>
                <Text size="lg" fw={500}>{course.subject_name_th}</Text>
                <Text size="lg" fw={500}>{course.subject_name_en}</Text>
            </Stack>
            <Stack gap={0}>
                <Group gap={5}>
                    <Text size="sm" fw={700}>Day :</Text>
                    <Text size="sm" fw={700}>
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
                {course.max_credit && <Group gap={5}>
                    <Text size="sm" fw={700}>Section Type :</Text>
                    <Text size="sm" fw={400}>{course.section_type_en}</Text>
                </Group>}
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
            <Group gap={"sm"}>
                <Button variant='light' onClick={() => onCopySubjectName(`${course.subject_code} ${course.subject_name_en}`)} leftSection={<IconCopy size={16} />}>Subject Name</Button>
                {actions}
            </Group>
        </Stack>
    )
}

export { ModalCourseDetailTitle, ModalCourseChildren }