"use client";

import React from "react";
import clsx from "clsx";
import _ from "lodash";
import { Group, Image, Text } from "@mantine/core";
import dayColors from "utils/dayColors";
import { days, daysThaiMap, getGridRepeat, getPosition, hours, hoursMap, maxIndex } from "utils/tableUtils";
import { type ITableCourseProps } from "@/types/ITableCourseProps";
import { Itim } from "next/font/google";

const fontItim = Itim({
    weight: "400",
});

const Theme01 = (props: ITableCourseProps) => {
    const gridRepeat = getGridRepeat(props.scheduleData)
    const maxIndexData = maxIndex(props.scheduleData)

    const widthClass = `w-full`;
    const heightClass = `h-[80px]`;
    const borderColor = "border-[#2c2c2b]";

    const getDayColor = (day: string) => {
        const dayColorMap = {
            "MON": {
                bg: "bg-[#ffe5b6]"
            },
            "TUE": {
                bg: "bg-[#f6ced2]"
            },
            "WED": {
                bg: "bg-[#cbe6cb]"
            },
            "THU": {
                bg: "bg-[#efceb8]"
            },
            "FRI": {
                bg: "bg-[#cce2ef]"
            },
            "SAT": {
                bg: "bg-[#efccee]"
            },
            "SUN": {
                bg: "bg-[#ffd3d3]"
            },
        }

        return dayColorMap[day as keyof typeof dayColorMap]
    }

    return (
        <div className={clsx("min-w-fit", fontItim.className)}>
            <Group justify="space-between" mx={"xl"}>
                <Image h={70} src="https://media-public.canva.com/SIl8w/MAEyzhSIl8w/1/t.png" />
                <div className="text-3xl">ตารางเรียน : Class Schedule</div>
                <Image h={70} src="https://media-public.canva.com/nrCPU/MAFUFznrCPU/1/t.png" />
            </Group>
            <div className={clsx("flex flex-col w-full bg-[#fffbf5]")}>
                <div className={`grid bg-[#f4dccb] rounded-t-3xl`} style={{
                    gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                }}>
                    <div className={clsx("col-span-2 p-2 font-semibold text-center", widthClass)}>
                        คาบ
                    </div>
                    {hours.slice(0, maxIndexData).map((hour, i) => (
                        <React.Fragment key={hour}>
                            <div className={clsx("col-span-2 flex pl-1 items-center justify-center", widthClass)}>
                                <Text size="sm" fw={500}>
                                    {i + 1}
                                </Text>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={`grid`} style={{
                    gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                }}>
                    <div className={clsx("border-b border-r bg-[#fffbf5] border-l border-t col-span-2 p-2 font-semibold text-center", widthClass, borderColor)}>
                        วัน/เวลา
                    </div>
                    {hours.slice(0, maxIndexData).map((hour) => (
                        <React.Fragment key={hour}>
                            <div className={clsx("col-span-2 flex border-b border-t border-r bg-[#fffbf5] pl-1 items-center justify-center", widthClass, borderColor)}>
                                <Text size="sm" fw={500}>
                                    {hoursMap[hour as keyof typeof hoursMap]}
                                </Text>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {days.map((day) => (
                    <div className="relative" key={day}>
                        <div className={`grid`} style={{
                            gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                        }}>
                            <div className={clsx("border-r flex items-center justify-center border-l col-span-2 p-2 font-semibold", "border-b", widthClass, heightClass, borderColor, getDayColor(day).bg)}>
                                {daysThaiMap[day as keyof typeof daysThaiMap]}
                            </div>
                            {hours.slice(0, maxIndexData).map((hour) => (
                                <div className={clsx("col-span-2 border-r", "border-b", widthClass, heightClass, borderColor)} key={hour} />
                            ))}
                        </div>
                        <div className={`grid absolute z-10 top-0 left-0 right-0 bottom-0`} key={day} style={{
                            gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                        }}>
                            {_.sortBy(props.scheduleData.filter(course => course.day_w.trim() === day), (course) => course.time_start).map((course, index) => {
                                const day_w = course.day_w.trim();
                                const dayColor = dayColors[day_w];

                                return (
                                    <div onClick={() => {
                                        if (props.onClick) {
                                            props.onClick(course);
                                        }
                                    }} key={`${index}_${course.section_id}_${day}_${course.subject_code}`} className={clsx("w-full p-[5px]", props.onClick && "cursor-pointer")} style={{
                                        gridColumn: `${getPosition(course.time_from!)}/${getPosition(course.time_to!)}`,
                                    }} >
                                        <div className={clsx("text-center w-full h-full flex flex-col items-center rounded-md", getDayColor(day).bg)}>
                                            <Text fw={600} lineClamp={1}>{course.subject_code}</Text>
                                            <Text fw={600} size="sm" lineClamp={1}>{course.subject_name_th}</Text>
                                            <Text fw={400} size="xs" lineClamp={1}>{course.room_name_en} | Sec {course.section_code}</Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Theme01;
