import { ActionIcon, Group, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import SubjectCard from "./SubjectCard/SubjectCard";

export default function ExploreCourse() {
    return (
        <Stack gap={5}>
            <Group justify="space-between">
                <Group gap={"xs"}>
                    <Text size="md" fw={700}>Explore Course</Text>
                    <Text size="xs" c="dimmed">14 results</Text>
                </Group>
                <ActionIcon variant="subtle" color="gray">
                    <IconFilter size={16} />
                </ActionIcon>
            </Group>
            <TextInput size="sm" leftSection={<IconSearch size={16} />} placeholder="Search for a course" />
            <ScrollArea h={"calc(-10rem + 100vh)"}>
                <Stack gap={10} mt={5}>
                    {[...new Array(100)].map((_, index) => (
                        <SubjectCard key={index} />
                    ))}
                </Stack>
            </ScrollArea>
        </Stack>
    )
}