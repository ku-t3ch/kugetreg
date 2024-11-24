"use client";

import React from "react";
import { type Course } from "@/types/responses/IGroupCourseResponse";
import clsx from "clsx";
import _ from "lodash";

interface Props {
    scheduleData: Course[];
}

const dayColors: Record<string, { bg: string; border: string; text: string }> =
{
    MON: { bg: "bg-red-100", border: "border-red-300", text: "text-red-800" },
    TUE: {
        bg: "bg-orange-100",
        border: "border-orange-300",
        text: "text-orange-500",
    },
    WED: {
        bg: "bg-yellow-100",
        border: "border-yellow-300",
        text: "text-yellow-500",
    },
    THU: {
        bg: "bg-green-100",
        border: "border-green-300",
        text: "text-green-500",
    },
    FRI: {
        bg: "bg-blue-100",
        border: "border-blue-300",
        text: "text-blue-500",
    },
    SAT: {
        bg: "bg-indigo-100",
        border: "border-indigo-300",
        text: "text-indigo-500",
    },
    SUN: {
        bg: "bg-purple-100",
        border: "border-purple-300",
        text: "text-purple-500",
    },
    NONE: {
        bg: "bg-gray-100",
        border: "border-gray-300",
        text: "text-gray-500",
    },
};

const formatTime = (hour: number, minute: number): string => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

const getTimeSlotPosition = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (hours === undefined || minutes === undefined) {
        return 0;
    }
    return (hours - 8) * 2 + (minutes === 30 ? 1 : 0);
};

const TableCourse = (props: Props) => {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    const CourseSorting = (courses: Course[] | undefined) => {
        const sortedItems = _.orderBy(courses, ["time_start"], "asc");
        return sortedItems;
    };

    const maxTime = _.maxBy(CourseSorting(props.scheduleData), (o) => {
        return parseInt(o.time_to.split(":")[0] ?? "0");
    });

    const maxIndex = _.findIndex(hours, (time) => time === parseInt(maxTime?.time_to.split(":")[0] ?? "0")) + 1;

    const gridRepeat = hours.slice(0, maxIndex).length * 2


    const getScheduleItemsForDay = (day: string) => {
        return props.scheduleData
            .filter((item) => item.day_w.trim() === day)
            .map((item) => ({
                ...item,
                startSlot: getTimeSlotPosition(item.time_from),
                endSlot: getTimeSlotPosition(item.time_to),
                duration:
                    getTimeSlotPosition(item.time_to) -
                    getTimeSlotPosition(item.time_from),
            }));
    };

    return (
        <div className={`grid grid-cols-[100px_repeat(${gridRepeat},minmax(50px,1fr))] border-l border-t border-[#e3e5f8a9]`}>
            {/* Header Row */}
            <div className="border-b border-r border-[#e3e5f8a9] bg-[#fafaff] p-2 font-semibold">
                Day/Time
            </div>
            {hours.slice(0, maxIndex).map((hour) => (
                <React.Fragment key={hour}>
                    <div className="col-span-2 flex border-b border-r border-[#e3e5f8a9] bg-[#fafaff] p-2 text-center">
                        {formatTime(hour, 0)}
                    </div>
                </React.Fragment>
            ))}

            {/* Schedule Rows */}
            {days.map((day) => (
                <React.Fragment key={day}>
                    {/* Day Label */}
                    <div className="border-b border-r border-[#e3e5f8a9] bg-[#fafaff] p-2 w-full h-full flex justify-center items-center">
                        {day}
                    </div>
                    {/* Time Slots - 30-minute intervals */}
                    {Array.from({ length: gridRepeat }).map((_, slotIndex) => {
                        const currentHour = Math.floor(slotIndex / 2) + 8;
                        const isHalfHour = slotIndex % 2 === 1;
                        const timeStr = formatTime(currentHour, isHalfHour ? 30 : 0);

                        const daySchedule = getScheduleItemsForDay(day);
                        const itemsStartingHere = daySchedule.filter(
                            (item) => item.startSlot === slotIndex,
                        );

                        return (
                            <div
                                key={`${day}-${timeStr}`}
                                className={`relative min-h-[80px] border-b border-r border-[#e3e5f8a9] ${isHalfHour ? "border-r" : ""
                                    }`}
                            >
                                {/* {itemsStartingHere.map((item) => (
                                    <div
                                        key={item.section_id}
                                        className={`rounded-md border p-1 ${dayColors[day]?.bg ?? ""} ${dayColors[day]?.border ?? ""}`}
                                        style={{
                                            height: "100%",
                                            zIndex: 10,
                                        }}
                                    >
                                        {item.startSlot}
                                        {item.endSlot}
                                        <div
                                            className={clsx(
                                                "truncate text-sm font-medium",
                                                dayColors[day]?.text,
                                            )}

                                        >
                                            {item.subject_code} {item.subject_name_en}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {item.room_name_en}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.time_from} - {item.time_to}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {item.section_code} - {item.section_type_en}
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                        );
                    })}
                    
                    

                </React.Fragment>
            ))}
        </div>

    );
};

export default TableCourse;
