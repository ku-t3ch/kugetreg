"use client";
import { useEffect } from "react";

import TableCourse from "@/app/_components/TableCourse/TableCourse";
import { api } from "@/trpc/react";
import { Text } from "@mantine/core";
import useCourseStore from "./_store/useCourseStore";

export default function Page() {
    const getGroupCourse = api.stdProfile.getGroupCourse.useQuery();
    const hasCourse = getGroupCourse.data?.results && getGroupCourse.data?.results.length > 0;
    const { setCourses } = useCourseStore();

    useEffect(() => {
        if (hasCourse && getGroupCourse.data?.results[0]?.course) {
            setCourses(getGroupCourse.data?.results[0]?.course);
        }
    }, [setCourses, getGroupCourse.data?.results, hasCourse]);

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[75rem]">
                {getGroupCourse.isPending ? <Text>Loading...</Text> : <>
                    {getGroupCourse.data?.results &&
                        getGroupCourse.data?.results.length > 0 &&
                        getGroupCourse.data?.results[0]?.course ? (
                        <TableCourse scheduleData={getGroupCourse.data?.results[0]?.course} />
                    ) : (
                        <Text c={"dimmed"}>ไม่พบรายวิชา อาจจะยังไม่ได้ลงทะเบียน</Text>
                    )}
                </>}
            </div>
        </div>
    );
}
