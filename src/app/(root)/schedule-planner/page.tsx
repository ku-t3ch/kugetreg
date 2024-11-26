"use client"

import { Group, Paper, Stack, Tabs } from "@mantine/core";
import useCourseStore from "./_store/useCourseStore";
import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { useState } from "react";

const tabs = [
    {
        label: "Explore",
        key: "explore",
    },
    {
        label: "Schedule",
        key: "schedule",
    }
]

export default function Page() {
    const CourseStore = useCourseStore();
    const [activeTab, setActiveTab] = useState<string | null>('first');
    return (
        //         <Group gap={0} className="relative">
        //             <Paper className="fixed top-[5rem] bottom-10" p="md" withBorder>
        // asdf
        //             </Paper>
        //         </Group>
        <div>
            asdf
        </div>
    );
}
