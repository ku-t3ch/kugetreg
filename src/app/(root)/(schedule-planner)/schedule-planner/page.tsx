"use client"

import { useEffect } from 'react';

import BackButton from '@/app/_components/BackButton/BackButton';
import Footer from '@/app/_components/Footer';
import Logo from '@/app/_components/Logo/Logo';
import {
    ModalCourseChildren, ModalCourseDetailTitle
} from '@/app/_components/ModalCourse/ModalCourse';
import TableTheme from '@/app/_components/TableTheme';
import { ConfirmDeleteModalData } from '@/configs/common/ModalData/ModalData';
import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { api } from '@/trpc/react';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import {
    ActionIcon, AppShell, Burger, Button, Code, Group, Paper, ScrollArea, Stack, Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconEye, IconEyeOff, IconTrash } from '@tabler/icons-react';

import ExploreCourse from './_components/ExploreCourse/ExploreCourse';
import ScheduleHeader from './_components/ScheduleHeader/ScheduleHeader';
import useCoursePlanningStore from './_store/useCoursePlanningStore';

export default function Page() {
    const [opened, { toggle }] = useDisclosure();

    const getPlanningCourse = api.planningCourse.getPlanningCourse.useQuery()
    const savePlanningCourse = api.planningCourse.savePlanningCourse.useMutation()

    const coursePlanningStore = useCoursePlanningStore()

    useEffect(() => {
        if (getPlanningCourse.data) {
            coursePlanningStore.setCourses(getPlanningCourse.data)
        }
    }, [getPlanningCourse.data])


    const onRemoveCourses = (course: Course) => {
        modals.openConfirmModal({
            ...ConfirmDeleteModalData,
            children: <>Are you sure you want to remove <Code>{course.subject_code} {course.subject_name_en}</Code> ?</>,
            onConfirm: () => {
                coursePlanningStore.removeCourses(course)
                modals.closeAll()
            }
        })
    }

    const onShowDetail = (course: Course) => {
        modals.open({
            title: <ModalCourseDetailTitle course={course} />,
            children: <ModalCourseChildren course={course}
                actions={
                    <>
                        <Button variant='light' onClick={() => {
                            onHidden(course)
                            modals.closeAll()
                        }} leftSection={<IconEyeOff size={16} />}>Hide</Button>
                        <Button variant='light' leftSection={<IconTrash size={16} />} color="red" onClick={() => onRemoveCourses(course)}>
                            Remove
                        </Button>
                    </>
                }
            />,
        })
    }

    const onHidden = (course: Course) => {
        coursePlanningStore.onHidden(course)
    }

    const onShow = (course: Course) => {
        coursePlanningStore.onShow(course)
    }

    const onSavePlanningCourse = () => {
        const key = notifications.show(LoadingNotificationData)
        savePlanningCourse.mutate({
            course: JSON.stringify(coursePlanningStore.getCoursesForSave())
        },
            {
                onSuccess: () => {
                    notifications.update({ ...SuccessNotificationData, id: key, message: "Save planning course successfully" })
                    void getPlanningCourse.refetch()
                },
                onError: (error) => {
                    notifications.update({ ...ErrorNotificationData, id: key, message: `Save planning course failed ${error.message}` })
                }
            }
        )
    }

    const onClearPlanningCourse = () => {
        modals.openConfirmModal({
            ...ConfirmDeleteModalData,
            children: <>Are you sure you want to clear all courses?</>,
            onConfirm: () => {
                coursePlanningStore.setCourses([])
                modals.closeAll()
            }
        })
    }

    const isChange = coursePlanningStore.checkIsChange(getPlanningCourse.data ?? [])

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 400, breakpoint: "xs", collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" align='center' justify="start">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Logo element=": วางแผนตารางเรียน" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar component={ScrollArea} p="xs">
                <ExploreCourse />
            </AppShell.Navbar>
            <AppShell.Main>
                <BackButton />
                <Stack gap={"lg"}>
                    <ScheduleHeader />
                    <div className='overflow-x-auto'>
                        <TableTheme
                            onClick={onShowDetail}
                            scheduleData={coursePlanningStore.getCourses()} />
                    </div>
                    <Group justify='space-between'>
                        <div>Total credits {coursePlanningStore.getTotalCredit()}</div>
                        <Group>
                            <Button disabled={coursePlanningStore.courses.length === 0} onClick={onClearPlanningCourse} color="red" variant="light">Clear</Button>
                            <Button disabled={!isChange} onClick={onSavePlanningCourse} color="blue" variant="light">Save</Button>
                        </Group>
                    </Group>
                    <Stack gap={5}>
                        {coursePlanningStore.getCoursesUnique().map((course, i) => (
                            <Paper key={i} withBorder p="sm">
                                <div className='flex justify-between flex-col gap-y-2 md:flex-row'>
                                    <Group>
                                        {
                                            course.is_hidden ?
                                                <ActionIcon variant="light" color='gray' onClick={() => onShow(course)}>
                                                    <IconEyeOff />
                                                </ActionIcon>
                                                :
                                                <ActionIcon variant="light" color='green' onClick={() => onHidden(course)}>
                                                    <IconEye />
                                                </ActionIcon>
                                        }
                                        <Stack gap={0}>
                                            <Group gap={10}>
                                                <Text>{course.subject_code}</Text>
                                                <Text c="dimmed">[{course.max_credit} Credit]</Text>
                                            </Group>
                                            <Text fw={700} size='lg'>{course.subject_name_en}</Text>
                                            <Text>Sec {course.section_code}</Text>
                                        </Stack>
                                    </Group>

                                    <div className='flex justify-end items-center'>
                                        <Button onClick={() => onRemoveCourses(course)} color="red" variant="light" leftSection={<IconTrash size={16} />}>
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                    </Stack>
                    <Footer />
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
