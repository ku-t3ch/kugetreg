"use client"

import { useEffect, useState } from 'react';

import BackButton from '@/app/[locale]/_components/BackButton/BackButton';
import Footer from '@/app/[locale]/_components/Footer';
import Logo from '@/app/[locale]/_components/Logo/Logo';
import {
    ModalCourseChildren, ModalCourseDetailTitle
} from '@/app/[locale]/_components/ModalCourse/ModalCourse';
import TableTheme from '@/app/[locale]/_components/TableTheme';
import { ConfirmDeleteModalData } from '@/configs/common/ModalData/ModalData';
import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { api } from '@/trpc/react';
import { CourseSchemaToCourseCustom, type Course } from '@/types/responses/IGroupCourseResponse';
import {
    ActionIcon, AppShell, Box, Burger, Button, Code, Group, LoadingOverlay, Modal, Paper, ScrollArea, Stack, Text,
    Title
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconDeviceFloppy, IconEye, IconEyeOff, IconPencil, IconTrash } from '@tabler/icons-react';

import ExploreCourse from './_components/ExploreCourse/ExploreCourse';
import ScheduleHeader from './_components/ScheduleHeader/ScheduleHeader';
import useCoursePlanningStore from './_store/useCoursePlanningStore';
import { useTranslations } from 'next-intl';
import ChangeLanguage from '@/app/[locale]/_components/ChangeLanguage/ChangeLanguage';
import CourseForm from './_components/CourseForm/CourseForm';
import { courseCustomSchemaToStore, CourseCustomSchemaType } from './schemas/courseCustom.schema';

export default function Page() {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const [editCourseOpened, { open: editCourseOpen, close: editCourseClose }] = useDisclosure(false);
    const [editCourseData, setEditCourseData] = useState<CourseCustomSchemaType | null>(null);

    const t = useTranslations()

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

    const onShowEditCourse = (course: Course) => {
        editCourseOpen()
        const result = CourseSchemaToCourseCustom.parse(course)
        setEditCourseData(result)
    }

    const onEditCourse = (data: CourseCustomSchemaType) => {
        const course = courseCustomSchemaToStore.parse(data)
        coursePlanningStore.editCourse(course)
        editCourseClose()
    }

    const onShowDetail = (course: Course) => {
        modals.open({
            title: <ModalCourseDetailTitle course={course} />,
            children: <ModalCourseChildren course={course}
                actions={
                    <>
                        <Button variant='light'
                            onClick={() => {
                                onHidden(course)
                                modals.closeAll()
                            }}
                            leftSection={<IconEyeOff size={16} />}
                        >
                            {t("common.button.subject.hide")}
                        </Button>
                        {course.is_custom && <Button
                            variant='light'
                            onClick={() => {
                                onShowEditCourse(course)
                                modals.closeAll()
                            }}
                            leftSection={<IconPencil size={16} />}
                        >
                            {t("common.button.subject.edit")}
                        </Button>}
                        <Button variant='light' leftSection={<IconTrash size={16} />} color="red" onClick={() => onRemoveCourses(course)}>
                            {t("common.button.subject.remove")}
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
        <>
            <Modal fullScreen={isMobile} opened={editCourseOpened} onClose={editCourseClose} title={<Title order={3}>{t("schedule_planner.editCourse.modal.title")}</Title>} size="lg">
                <CourseForm type="edit" data={editCourseData ?? undefined} onFinish={onEditCourse} />
            </Modal>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 400, breakpoint: "xs", collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md" align='center' justify="space-between">
                        <Group>
                            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
                            <Logo element=": วางแผนตารางเรียน" />
                        </Group>
                        <Group>
                            <ChangeLanguage />
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar component={ScrollArea} p="xs">
                    <BackButton />
                    <ExploreCourse />
                </AppShell.Navbar>
                <AppShell.Main>
                    <Box pos="relative">
                        <LoadingOverlay visible={getPlanningCourse.isPending} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
                        <Stack gap={"lg"}>
                            <ScheduleHeader />
                            <div className='overflow-x-auto'>
                                <TableTheme
                                    onClick={onShowDetail}
                                    scheduleData={coursePlanningStore.getCourses()} />
                            </div>
                            <Group justify='space-between'>
                                <div>{t("schedule_planner.planning.totalCredits")} {coursePlanningStore.getTotalCredit()}</div>
                                <Group>
                                    <Button disabled={coursePlanningStore.courses.length === 0} onClick={onClearPlanningCourse} color="red" variant="light">
                                        {t("common.button.subject.clear")}
                                    </Button>
                                    <Button disabled={!isChange} onClick={onSavePlanningCourse} leftSection={<IconDeviceFloppy size={16} />} color="blue" variant="light">{t("common.button.subject.save")}</Button>
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
                                                        <Text c="dimmed">[{course.max_credit} {t("common.subject.credit")}]</Text>
                                                    </Group>
                                                    <Text fw={700} size='lg'>
                                                        {
                                                            t("common.mask.subject.subject_name", {
                                                                subject_name_en: course.subject_name_en,
                                                                subject_name_th: course.subject_name_th
                                                            })
                                                        }
                                                    </Text>
                                                    <Text>{t("common.subject.section")} {course.section_code}</Text>
                                                </Stack>
                                            </Group>

                                            <div className='flex justify-end items-center'>
                                                <Button onClick={() => onRemoveCourses(course)} color="red" variant="light" leftSection={<IconTrash size={16} />}>
                                                    {t("common.button.subject.remove")}
                                                </Button>
                                            </div>
                                        </div>
                                    </Paper>
                                ))}
                            </Stack>
                            <Footer />
                        </Stack>
                    </Box>
                </AppShell.Main>
            </AppShell>
        </>
    );
}
