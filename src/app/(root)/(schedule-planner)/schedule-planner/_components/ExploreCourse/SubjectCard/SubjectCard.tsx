"use client";

import { Paper, Stack, Group, Text, Badge, Collapse, ActionIcon, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconUser } from "@tabler/icons-react";

interface Props { }

export default function SubjectCard(props: Props) {
    const [opened, { toggle }] = useDisclosure(false);
    return (
        <Paper p="xs" withBorder className="relative border-red-400">
            <div className="absolute top-1 right-3">
                <ActionIcon variant="subtle" size={"md"} onClick={toggle}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </div>
            <Stack gap={2}>
                {/* <Alert mb={"md"} variant="light" color="red" title="Time conflict with" icon={<IconInfoCircle />}>
                                    <Stack>
                                        <Text lineClamp={1} size="sm">- (01418332-65) Information System Security</Text>
                                    </Stack>
                                </Alert> */}
                <Group gap={3}>
                    <Text size="sm" fw={700}>01418497-65</Text>
                    <Text size="xs" c="dimmed">[ 1 Credit ]</Text>
                </Group>
                <Text lineClamp={1} size="sm">Seminar</Text>
                <Group gap={2}>
                    <Badge variant="light" tt="none" color="yellow" size="xs">Thursday</Badge>
                    <Badge variant="light" tt="none" color="pink" size="xs">Tuesday</Badge>
                    <Badge variant="light" tt="none" color="green" size="xs">Monday</Badge>
                </Group>
                <Group justify="space-between">
                    <Group gap={2}>
                        <Text lineClamp={1} size="xs">Sec 1</Text>
                        <Text lineClamp={1} size="xs">|</Text>
                        <Text lineClamp={1} size="xs">Lecture</Text>
                    </Group>
                    <Group gap={2} align="center">
                        <IconUser color="gray" size={13} />
                        <Text c={"dimmed"} lineClamp={1} size="sm">54/57</Text>
                    </Group>
                </Group>
                <Collapse in={opened}>
                    <Divider my={10} />
                    <Group align="start">
                        <Stack gap={2}>
                            <Text size="xs" c="dimmed">Teacher</Text>
                            <Text size="xs">Chavalit Srisathapornphat</Text>
                            <Text size="xs">Sukumal Kitisin</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Text size="xs" c="dimmed">Time</Text>
                            <Text size="xs">THU 9:30 - 11:00</Text>
                            <Text size="xs">TUE 9:30 - 11:00</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Text size="xs" c="dimmed">Room</Text>
                            <Text size="xs">SC45-709</Text>
                        </Stack>
                        <Stack gap={2}>
                            <Text size="xs" c="dimmed">Eligible Major</Text>
                            <Text size="xs">D-14</Text>
                        </Stack>
                    </Group>
                </Collapse>
            </Stack>
        </Paper>
    )
}