import { type Course } from "@/types/responses/IGroupCourseResponse";
import _ from "lodash";
const daysThaiMap = {
  MON: "จันทร์",
  TUE: "อังคาร",
  WED: "พุธ",
  THU: "พฤหัสบดี",
  FRI: "ศุกร์",
  SAT: "เสาร์",
  SUN: "อาทิตย์",
};
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const hoursMap = {
  8: "8:00-9:00",
  9: "9:00-10:00",
  10: "10:00-11:00",
  11: "11:00-12:00",
  12: "12:00-13:00",
  13: "13:00-14:00",
  14: "14:00-15:00",
  15: "15:00-16:00",
  16: "16:00-17:00",
  17: "17:00-18:00",
  18: "18:00-19:00",
  19: "19:00-20:00",
  20: "20:00-21:00",
  21: "21:00-22:00",
  22: "22:00-23:00",
  23: "23:00-00:00",
};
const timeMap: { time: string; pos: number }[] = [
  { time: "8:00", pos: 3 },
  { time: "8:30", pos: 4 },
  { time: "9:00", pos: 5 },
  { time: "9:30", pos: 6 },
  { time: "10:00", pos: 7 },
  { time: "10:30", pos: 8 },
  { time: "11:00", pos: 9 },
  { time: "11:30", pos: 10 },
  { time: "12:00", pos: 11 },
  { time: "12:30", pos: 12 },
  { time: "13:00", pos: 13 },
  { time: "13:30", pos: 14 },
  { time: "14:00", pos: 15 },
  { time: "14:30", pos: 16 },
  { time: "15:00", pos: 17 },
  { time: "15:30", pos: 18 },
  { time: "16:00", pos: 19 },
  { time: "16:30", pos: 20 },
  { time: "17:00", pos: 21 },
  { time: "17:30", pos: 22 },
  { time: "18:00", pos: 23 },
  { time: "18:30", pos: 24 },
  { time: "19:00", pos: 25 },
  { time: "19:30", pos: 26 },
  { time: "20:00", pos: 27 },
  { time: "20:30", pos: 28 },
  { time: "21:00", pos: 29 },
  { time: "21:30", pos: 30 },
  { time: "22:00", pos: 31 },
  { time: "22:30", pos: 32 },
  { time: "23:00", pos: 33 },
  { time: "23:30", pos: 34 },
];

const getPosition = (time: string) => {
  const hour = parseInt(time.split(":")[0]!);
  const minute = parseInt(time.split(":")[1]!);
  const timeString = `${hour}:${minute === 0 ? "00" : "30"}`;
  const timeObj = timeMap.find((t) => t.time === timeString);
  if (timeObj) {
    return timeObj.pos;
  }
  return 0;
};

const CourseSorting = (courses: Course[] | undefined) => {
  const sortedItems = _.orderBy(courses, ["time_start"], "asc");
  return sortedItems;
};

const maxIndex = (courses: Course[]) => {
  const maxTime = _.maxBy(CourseSorting(courses), (o) => {
    return parseInt(o.time_to.split(":")[0] ?? "0");
  });

  const index =
    _.findIndex(hours, (time) => time === parseInt(maxTime?.time_to.split(":")[0] ?? "0")) + 1;
  if (index < 11) {
    return 11;
  }
  return index;
};

const getGridRepeat = (courses: Course[]) => {
  const gridRepeat = hours.slice(0, maxIndex(courses)).length * 2;
  return gridRepeat;
};

export {
  days,
  daysThaiMap,
  hours,
  hoursMap,
  timeMap,
  getPosition,
  CourseSorting,
  maxIndex,
  getGridRepeat,
};
