"use client"
import clsx from 'clsx';
import dayColors from 'utils/dayColors';
import * as ics from "ics";
import { saveAs } from "file-saver"

import {
    ErrorNotificationData, LoadingNotificationData, SuccessNotificationData
} from '@/configs/common/NotificationData/NotificationData';
import { type Course } from '@/types/responses/IGroupCourseResponse';
import { Button, Group, Select, Stack, Text, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCopy, IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { addMonths, eachDayOfInterval, endOfMonth, format, formatDistanceToNow, getDate, getDay, getDaysInMonth, getMonth, getYear, intervalToDuration, isAfter, parse, startOfMonth } from 'date-fns';
import { modals } from '@mantine/modals';
import { useRef } from 'react';

interface Props {
    course: Course
}

function ModalCourseDetailTitle({ course }: Props) {
    const t = useTranslations()
    return (
        <div className="flex gap-2 items-center justify-between w-full">
            <Text size="xl" fw={700}>{course.subject_code}</Text>
            {course.max_credit ? <Text size="md" fw={600} c={"dimmed"}>[{course.max_credit} {t("common.subject.credit")}]</Text> :
                <Text size="md" fw={600} c={"dimmed"}>[{t("common.mask.subject.section_type", {
                    section_type_th: course.section_type_th,
                    section_type_en: course.section_type_en
                })}]
                </Text>}
        </div>
    )
}

function ModalCourseChildren({ course, actions }: Props & { actions?: React.ReactNode }) {
    const t = useTranslations()

    const CalendarDateSelectRef = useRef<HTMLInputElement>(null)
    const CalendarDetailRef = useRef<HTMLTextAreaElement>(null)

    const onCopySubjectName = async (subjectName: string) => {
        const key = notifications.show(LoadingNotificationData)
        try {
            await navigator.clipboard.writeText(subjectName);
            notifications.update({
                ...SuccessNotificationData,
                id: key,
                message: "Copied to clipboard : " + subjectName,
                color: "green",
            })
        } catch (error) {
            if (error instanceof Error) {
                notifications.update({
                    ...ErrorNotificationData,
                    id: key,
                    message: "Failed to copy to clipboard : " + error.message,
                    color: "red",
                })
            }
        }
    }

    function getFutureDatesForDay(dayName: string) {
        const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        // Find the index of the specified day
        const targetDayIndex = daysOfWeek.indexOf(dayName.toUpperCase());
        if (targetDayIndex === -1) {
            throw new Error("Invalid day name. Use a three-letter day abbreviation like 'MON'.");
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Strip time
        const start = startOfMonth(now); // Start of the current month
        const end = endOfMonth(now); // End of the current month

        // Get all dates in the current month
        const allDates = eachDayOfInterval({ start, end: addMonths(end, 1) });

        // Filter dates that match the target weekday and are after today
        const matchingDates = allDates.filter(
            date => date.getDay() === targetDayIndex && isAfter(date, today)
        );

        // Format the matching dates as strings
        return matchingDates.map(date => date);
    }

    const onDownloadICS = async () => {
        try {
            const futureDatesForDays = getFutureDatesForDay(course.day_w.trim())

            modals.openConfirmModal({
                title: "Select Date",
                children: <div>
                    <Select
                        ref={CalendarDateSelectRef}
                        defaultValue={futureDatesForDays[0] ? format(futureDatesForDays[0], "dd/MM/yyyy") : ""}
                        data={futureDatesForDays.map((date) => ({
                            value: format(date, "dd/MM/yyyy"),
                            label: `${format(date, "E, dd MMM yyyy")} (${formatDistanceToNow(date, { addSuffix: true })})`
                        })) ?? []}
                        label="Select date"
                    />
                    <Textarea
                        ref={CalendarDetailRef}
                        label="Detail"
                        placeholder="Enter description in calendar"
                    />
                </div>
                ,
                labels: {
                    confirm: "Download to calendar",
                    cancel: "Cancel"
                },
                onConfirm: () => {
                    if (!CalendarDateSelectRef.current?.value) {
                        notifications.show({
                            ...ErrorNotificationData,
                            message: "Please select date",
                            color: "red"
                        })
                        return
                    }

                    const key = notifications.show(LoadingNotificationData)
                    const futureDatesForDay = parse(CalendarDateSelectRef.current.value.split("(")[0]?.trim() ?? "", "E, dd MMM yyyy", new Date())

                    const year = getYear(futureDatesForDay);
                    const month = getMonth(futureDatesForDay) + 1
                    const date = getDate(futureDatesForDay)

                    const hourStart = parse(course.time_from, "HH:mm", new Date()).getHours()
                    const minuteStart = parse(course.time_from, "HH:mm", new Date()).getMinutes()

                    const hourEnd = parse(course.time_to, "HH:mm", new Date()).getHours()
                    const minuteEnd = parse(course.time_to, "HH:mm", new Date()).getMinutes()

                    const start: ics.DateTime = [year, month, date, hourStart, minuteStart]

                    const description = CalendarDetailRef.current?.value

                    ics.createEvent({
                        title: course.subject_name_en,
                        description: description ?? "",
                        location: course.room_name_en,
                        busyStatus: "BUSY",
                        start,
                        duration: intervalToDuration({
                            start: new Date(year, month, date, hourStart, minuteStart),
                            end: new Date(year, month, date, hourEnd, minuteEnd)
                        }),
                    }, (error, value) => {
                        if (error) {
                            notifications.update({
                                ...ErrorNotificationData,
                                id: key,
                                message: "Failed to download to calendar : " + error.message
                            })
                        }

                        if (value) {
                            const blob = new Blob([value], { type: "text/calendar;charset=utf-8" })
                            saveAs(blob, `${course.subject_code}_${course.subject_name_en}_${format(futureDatesForDay, "yyyy-MM-dd")}.ics`)

                            notifications.update({
                                ...SuccessNotificationData,
                                id: key,
                                message: "Downloaded to calendar",
                                color: "green",
                            })
                        } else {
                            notifications.update({
                                ...ErrorNotificationData,
                                id: key,
                                message: "Failed to download to calendar: Event value is undefined",
                                color: "red",
                            })
                        }
                    })
                }
            })




        } catch (error) {
            if (error instanceof Error) {
                notifications.show({
                    ...ErrorNotificationData,
                    message: "Failed to download to calendar : " + error.message,
                    color: "red",
                })
            }
        }
    }

    return (
        <Stack gap={"xs"}>
            <Stack gap={0}>
                <Text size="xl" fw={500}>
                    {t("common.mask.subject.subject_name", {
                        subject_name_th: course.subject_name_th,
                        subject_name_en: course.subject_name_en
                    })}
                </Text>
            </Stack>
            <Stack gap={0}>
                <Group gap={5}>
                    <Text size="sm" fw={700}>{t("common.subject.day")} :</Text>
                    <Text size="sm" fw={700}>
                        <span className={clsx(dayColors[course.day_w.trim()]?.text)}>
                            {course.day_w}
                        </span>
                    </Text>
                </Group>
                <Group gap={5}>
                    <Text size="sm" fw={700}>{t("common.subject.room")} :</Text>
                    <Text size="sm" fw={400}>
                        {t("common.mask.subject.room_name", {
                            room_name_en: course.room_name_en,
                            room_name_th: course.room_name_th
                        })}
                    </Text>
                </Group>
                <Group gap={5}>
                    <Text size="sm" fw={700}>{t("common.subject.section")} :</Text>
                    <Text size="sm" fw={400}>{course.section_code}</Text>
                </Group>
                {course.max_credit && <Group gap={5}>
                    <Text size="sm" fw={700}>{t("common.subject.sectionType")} :</Text>
                    <Text size="sm" fw={400}>
                        {t("common.mask.subject.section_type", {
                            section_type_th: course.section_type_th,
                            section_type_en: course.section_type_en
                        })}
                    </Text>
                </Group>}
                <Group gap={5}>
                    <Text size="sm" fw={700}>{t("common.subject.time")} :</Text>
                    <Text size="sm" fw={400}>{course.time_from} - {course.time_to}</Text>
                </Group>
            </Stack>
            <Stack gap={0}>
                <Text size="sm" fw={700}>{t("common.subject.teacher")} :</Text>
                {t("common.mask.subject.teacher_name", {
                    teacher_name: course.teacher_name,
                    teacher_name_en: course.teacher_name_en
                }).split(",").map((teacher, i) => (
                    <Text size="sm" fw={400} key={i}>- {teacher}</Text>
                ))}
            </Stack>
            <Group gap={"sm"}>
                <Button variant='light' onClick={() => onCopySubjectName(`${course.subject_code} ${course.subject_name_en}`)} leftSection={<IconCopy size={16} />}>{t("common.subject.button.copyName")}</Button>
                <Button variant='light' onClick={onDownloadICS} leftSection={<IconDownload size={16} />}>{t("common.button.subject.downloadICS")}</Button>
                {actions}
            </Group>
        </Stack>
    )
}

export { ModalCourseDetailTitle, ModalCourseChildren }