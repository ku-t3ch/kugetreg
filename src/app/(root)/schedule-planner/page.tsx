"use client"

import { Stack } from "@mantine/core";
import useCourseStore from "./_store/useCourseStore";
import TableCourse from "@/app/_components/TableCourse/TableCourse";

export default function Page() {
    const CourseStore = useCourseStore();
    return (
        <Stack gap={"md"}>
            <div className="overflow-x-auto">
                <TableCourse scheduleData={[]} />
            </div>
        </Stack>
    );
}
