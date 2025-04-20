"use client";
import _ from 'lodash';
import { useEffect, useState } from 'react';

import { ModalCourseChildren, ModalCourseDetailTitle } from '@/app/[locale]/_components/ModalCourse/ModalCourse';
import { api } from '@/trpc/react';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { Button, Skeleton, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEyeOff } from '@tabler/icons-react';

import useCourseStore from './_store/useCourseStore';
import useHideCourseStore from './_store/useHideCourseStore';
import TableTheme from '@/app/[locale]/_components/TableTheme';
import { useTranslations } from 'next-intl';

export default function Page() {
    const getGroupCourse = api.stdProfile.getGroupCourse.useQuery();
    const [courses, setCourses] = useState<Course[] | null>(null);

    const t = useTranslations()

    const hasCourse = getGroupCourse.data?.results && getGroupCourse.data?.results.length > 0;
    const CourseStore = useCourseStore();
    const HideCourseStore = useHideCourseStore()

    useEffect(() => {
        if (hasCourse && getGroupCourse.data?.results[0]?.course) {
            setCourses(getGroupCourse.data?.results[0]?.course);
        }
    }, [CourseStore.setCourses, getGroupCourse.data?.results, hasCourse]);

    useEffect(() => {
        if (courses) {
            CourseStore.setCourses(courses);
        }
    }, [courses, CourseStore.setCourses])

    useEffect(() => {
        if (getGroupCourse.data?.results && getGroupCourse.data.results.length > 0 && getGroupCourse.data.results[0]?.course) {
            let tempCourses: Course[] = getGroupCourse.data.results[0].course
            HideCourseStore.hiddenCourses.forEach((course) => {
                tempCourses = tempCourses.filter((c) => c.subject_code !== course.subject_code);
            })
            setCourses(tempCourses)
        }
    }, [HideCourseStore.hiddenCourses, getGroupCourse.data?.results])


    const onShowDetail = (course: Course) => {
        modals.open({
            title: <ModalCourseDetailTitle course={course} />,
            children: <ModalCourseChildren course={course}
                actions={
                    <Button variant='light' onClick={() => onHiddenCourse(course)} leftSection={<IconEyeOff size={16} />}>{t("common.button.subject.hide")}</Button>
                }
            />,
        })
    }

    const onHiddenCourse = (course: Course) => {
        HideCourseStore.onHiddenCourse(course)
        modals.closeAll()
    }

    return (
        <Stack gap={"md"}>
            <div className="overflow-x-auto">
                {getGroupCourse.isPending ? <div className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div className="flex items-center gap-1" key={i}>
                            <Skeleton height={80} width="20%" />
                            <Skeleton height={80} width="80%" />
                        </div>
                    ))}
                </div> : <>
                    {courses && courses.length > 0 && courses ? (
                        <TableTheme onClick={onShowDetail} scheduleData={courses} />
                    ) : (
                        <Text c={"dimmed"}>{t("schedule.subject.notFound")}</Text>
                    )}
                </>}
            </div>
        </Stack>
    );
}
