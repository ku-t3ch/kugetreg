"use client";

import React from "react";
import { type Course } from "@/types/responses/IGroupCourseResponse";
import clsx from "clsx";

interface Props {
  scheduleData: Course[];
}

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const hours = Array.from({ length: 9 }, (_, i) => i + 8); // 8:00 to 16:00

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
    <div className="grid grid-cols-[100px_repeat(18,minmax(75px,1fr))] border-l border-t border-[#e3e5f8] w-full">
      {/* Header Row */}
      <div className="border-b border-r border-[#e3e5f8] bg-[#fafaff] p-2 font-semibold">
        Day/Time
      </div>
      {hours.map((hour) => (
        <React.Fragment key={hour}>
          <div className="col-span-2 flex border-b border-r border-[#e3e5f8] bg-[#fafaff] p-2 text-center">
            {formatTime(hour, 0)}
          </div>
        </React.Fragment>
      ))}

      {/* Schedule Rows */}
      {days.map((day) => (
        <React.Fragment key={day}>
          {/* Day Label */}
          <div className="border-b border-r border-[#e3e5f8] bg-[#fafaff] p-2">
            {day}
          </div>
          {/* Time Slots - 30-minute intervals */}
          <div className="contents">
            {Array.from({ length: 18 }).map((_, slotIndex) => {
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
                  className={`relative min-h-[80px] border-b border-r border-[#e3e5f8] ${
                    isHalfHour ? "border-r" : ""
                  }`}
                >
                  {itemsStartingHere.map((item) => (
                    <div
                      key={item.section_id}
                      className={`absolute left-0 right-0 top-0 rounded-md border p-1 ${dayColors[day]?.bg ?? ""} ${dayColors[day]?.border ?? ""}`}
                      style={{
                        gridColumn: `span ${item.duration}`,
                        width: `calc(${item.duration * 100}% + 5px)`,
                        height: "103%",
                        zIndex: 10,
                      }}
                    >
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
                  ))}
                </div>
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TableCourse;
