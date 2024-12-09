const DaysMap = [
  {
    th: "จันทร์",
    en: "Monday",
    key: "MON",
    value: 1,
    color: "yellow",
  },
  {
    th: "อังคาร",
    en: "Tuesday",
    key: "TUE",
    value: 2,
    color: "pink",
  },
  {
    th: "พุธ",
    en: "Wednesday",
    key: "WED",
    value: 3,
    color: "green",
  },
  {
    th: "พฤหัสบดี",
    en: "Thursday",
    key: "THU",
    value: 4,
    color: "orange",
  },
  {
    th: "ศุกร์",
    en: "Friday",
    key: "FRI",
    value: 5,
    color: "blue",
  },
  {
    th: "เสาร์",
    en: "Saturday",
    key: "SAT",
    value: 6,
    color: "purple",
  },
  {
    th: "อาทิตย์",
    en: "Sunday",
    key: "SUN",
    value: 7,
    color: "red",
  },
  {
    th: "ไม่มี",
    en: "None",
    key: "NONE",
    value: 8,
    color: "gray",
  },
];

const convertKeyToDate = (key: string) => {
  return DaysMap.find((day) => day.key === key);
};

export { DaysMap, convertKeyToDate };
