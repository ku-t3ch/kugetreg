"use client";

import React from "react";
import clsx from "clsx";
import _ from "lodash";
import { Group, Image, Text } from "@mantine/core";
import dayColors from "utils/dayColors";
import { days, daysThaiMap, getGridRepeat, getPosition, hours, hoursMap, maxIndex } from "utils/tableUtils";
import { type ITableCourseProps } from "@/types/ITableCourseProps";
import { Mali } from "next/font/google";
import { getFullUrlCdn } from "utils/cdn";

const fontMali = Mali({
    weight: ["200", "300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
});

const Theme02 = (props: ITableCourseProps) => {
    const gridRepeat = getGridRepeat(props.scheduleData)
    const maxIndexData = maxIndex(props.scheduleData)

    const widthClass = `w-full`;
    const heightClass = `h-[80px]`;
    const borderColor = "border-[#2c2c2b]";

    const getDayColor = (day: string) => {
        const dayColorMap = {
            "MON": {
                bg: "bg-[#ffeed0]"
            },
            "TUE": {
                bg: "bg-[#ffeed0]"
            },
            "WED": {
                bg: "bg-[#ffeed0]"
            },
            "THU": {
                bg: "bg-[#ffeed0]"
            },
            "FRI": {
                bg: "bg-[#ffeed0]"
            },
            "SAT": {
                bg: "bg-[#ffeed0]"
            },
            "SUN": {
                bg: "bg-[#ffeed0]"
            },
        }

        return dayColorMap[day as keyof typeof dayColorMap]
    }

    return (
        <div className={clsx("min-w-fit bg-[#92bff1] relative overflow-hidden flex flex-col gap-3", props.isExport && "px-5 pt-5 pb-20", fontMali.className)}>
            <img className="absolute top-2 z-0 left-2 w-[4rem]" src={getFullUrlCdn("/kugetreg/theme/Theme02/images/01.png")} alt="" />
            <img className="absolute bottom-[-1rem] left-[-3.25rem] z-0 w-[9rem]" src={getFullUrlCdn("/kugetreg/theme/Theme02/images/03.png")} alt="" />
            <img className="absolute bottom-[0] z-0 w-[9rem] left-[9rem]" src={getFullUrlCdn("/kugetreg/theme/Theme02/images/04.png")} alt="" />
            <img className="absolute bottom-[0] z-0 w-[9rem] right-0" src={getFullUrlCdn("/kugetreg/theme/Theme02/images/05.png")} alt="" />
            <img className="absolute bottom-[0] z-0 h-[9rem] right-[12rem]" src={getFullUrlCdn("/kugetreg/theme/Theme02/images/06.png")} alt="" />
            <Group justify="center" mx={"xl"}>
                <div className="text-3xl font-extrabold">ตารางเรียน</div>
            </Group>
            <div className={clsx("flex flex-col w-full ")}>
                <div className={`grid`} style={{
                    gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                }}>
                    <div className={clsx("col-span-2 font-semibold text-center", widthClass, borderColor)}>

                    </div>
                    {hours.slice(0, maxIndexData).map((hour) => (
                        <React.Fragment key={hour}>
                            <div className={clsx("col-span-2 p-1", widthClass, borderColor)}>
                                <div className="flex items-center justify-center bg-[#ddf3ff] p-1 rounded-md">
                                    <Text size="sm" fw={500}>
                                        {hoursMap[hour as keyof typeof hoursMap]}
                                    </Text>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                {days.map((day) => (
                    <div className="relative" key={day}>
                        <div className={`grid`} style={{
                            gridTemplateColumns: `repeat(${gridRepeat + 2}, minmax(50px, 1fr))`
                        }}>
                            <div className={clsx("col-span-2 p-1", widthClass, heightClass)}>
                                <div className="flex items-center justify-center p-1 bg-[#ffeed0] w-full h-full rounded-md">
                                    <Text size="xl" fw={500}>{daysThaiMap[day as keyof typeof daysThaiMap]}</Text>
                                </div>
                            </div>
                            {hours.slice(0, maxIndexData).map((hour) => (
                                <div className={clsx("col-span-2 p-1", widthClass, heightClass, borderColor)} key={hour} >
                                    <div className="bg-white w-full h-full rounded-md"></div>
                                </div>
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
                                    }} key={`${index}_${course.section_id}_${day}_${course.subject_code}`} className={clsx("w-full p-1", props.onClick && "cursor-pointer")} style={{
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
            {props.isExport &&
                <div className="z-50">
                    Generated by : <span className="font-semibold">kugetreg.teerut.com</span>
                </div>
            }
        </div>
    );
};

export default Theme02;
