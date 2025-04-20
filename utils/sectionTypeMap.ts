export const sectionTypeMap = [
  {
    key: "lecture",
    th: "บรรยาย",
    en: "Lecture",
  },
  {
    key: "laboratory",
    th: "ปฏิบัติการ",
    en: "Laboratory",
  },
];

export const convertKeyToSectionType = (key: string) => {
  return (
    sectionTypeMap.find((section) => section.key === key.trim()) ?? {
      key: "null",
      th: "null",
      en: "null",
    }
  );
};

export const convertEnToSectionType = (en: string) => {
  return (
    sectionTypeMap.find(
      (section) => section.en.toLowerCase() === en.trim().toLowerCase(),
    ) ?? {
      key: "null",
      th: "null",
      en: "null",
    }
  );
};
