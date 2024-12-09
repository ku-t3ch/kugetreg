"use client"

import { type Course } from '@/types/responses/IGroupCourseResponse';
import { Button, Group, Paper, Stack, Text } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';

import useHideCourseStore from '../../_store/useHideCourseStore';

export default function HideCourseSection() {
    const HideCourseStore = useHideCourseStore()
    const onShowHiddenCourse = (course: Course) => {
        HideCourseStore.onShowHiddenCourse(course)
    }
    return (
        <>
            {
                HideCourseStore.hiddenCourses && HideCourseStore.hiddenCourses.length > 0 && <Stack gap={"sm"}>
                    <Text size="xl" fw={700}>รายวิชาที่ซ่อน</Text>
                    <Stack gap={"sm"}>
                        {HideCourseStore.hiddenCourses.map((course, i) => (
                            <Paper key={i} withBorder p="sm">
                                <Group justify='space-between' >
                                    <Stack gap={0}>
                                        <Text>{course.subject_code}</Text>
                                        <Text>{course.subject_name_en}</Text>
                                        <Text>{course.room_name_en} | Sec {course.section_code}</Text>
                                    </Stack>
                                    <Group gap={0}>
                                        <Button variant='light' onClick={() => onShowHiddenCourse(course)} leftSection={<IconEye size={16} />}>Show</Button>
                                    </Group>
                                </Group>
                            </Paper>
                        ))}
                    </Stack>
                </Stack>
            }
        </>
    )
}