"use client"

import Logo from "@/app/_components/Logo/Logo";
import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { ActionIcon, AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import ExploreCourse from "./_components/ExploreCourse/ExploreCourse";

export default function Page() {
    const [opened, { toggle }] = useDisclosure();
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
                    <TableCourse scheduleData={[]} />
                </ScrollArea>
            </AppShell.Main>
        </AppShell>
    );
}
