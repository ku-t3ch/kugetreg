"use client"

import Link from 'next/link';

import Logo from '@/app/_components/Logo/Logo';
import {
    ModalCourseChildren, ModalCourseDetailTitle
} from '@/app/_components/ModalCourse/ModalCourse';
import TableCourse from '@/app/_components/TableCourse/TableCourse';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { ActionIcon, AppShell, Burger, Button, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconChevronLeft, IconTrash } from '@tabler/icons-react';

import ExploreCourse from './_components/ExploreCourse/ExploreCourse';
import useCoursePlanningStore from './_store/useCoursePlanningStore';

export default function Page() {
    const [opened, { toggle }] = useDisclosure();
    const coursePlanningStore = useCoursePlanningStore()

    const onShowDetail = (course: Course) => {
        modals.open({
            title: <ModalCourseDetailTitle course={course} />,
            children: <ModalCourseChildren course={course}
                actions={
                    <Button variant='light' leftSection={<IconTrash size={16} />} color="red" onClick={() => coursePlanningStore.removeCourse(course)}>
                        Remove
                    </Button>
                }
            />,
        })
    }

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 400, breakpoint: "sm", collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" align='center' justify="space-between">
                    <Group align='center' gap="md">
                        <Link href={'/'} className="flex items-center">
                            <ActionIcon variant='subtle' onClick={toggle}>
                                <IconChevronLeft />
                            </ActionIcon>
                        </Link>
                        <Logo element=": วางแผนตารางเรียน" />
                    </Group>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar component={ScrollArea} p="xs">
                <ExploreCourse />
            </AppShell.Navbar>
            <AppShell.Main>
                <ScrollArea>
                    <TableCourse
                        onClick={onShowDetail}
                        scheduleData={coursePlanningStore.courses} />
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
}
