// same index in column
export const langs = ["th", "en", "cn"];
export const flagMap = {
    th: {
        name: "th",
        label: "ไทย",
        flag: "https://flagcdn.com/th.svg",
    },
    en: {
        name: "gb",
        label: "English",
        flag: "https://flagcdn.com/gb.svg",
    },
    cn: {
        name: "cn",
        label: "简体中文",
        flag: "https://flagcdn.com/cn.svg",
    },
}
type LangKey = keyof typeof flagMap;
export const getFlagMap = (lang: string) => flagMap[lang as LangKey] || flagMap.en;