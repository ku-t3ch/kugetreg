const dayColors: Record<string, { bg: string; bgHover: string; border: string; text: string }> =
{
    MON: { bg: "bg-red-100", bgHover: "hover:bg-red-200", border: "border-red-300", text: "text-red-800" },
    TUE: {
        bg: "bg-orange-100",
        bgHover: "hover:bg-orange-200",
        border: "border-orange-300",
        text: "text-orange-500",
    },
    WED: {
        bg: "bg-yellow-100",
        bgHover: "hover:bg-yellow-200",
        border: "border-yellow-300",
        text: "text-yellow-500",
    },
    THU: {
        bg: "bg-green-100",
        bgHover: "hover:bg-green-200",
        border: "border-green-300",
        text: "text-green-500",
    },
    FRI: {
        bg: "bg-blue-100",
        bgHover: "hover:bg-blue-200",
        border: "border-blue-300",
        text: "text-blue-500",
    },
    SAT: {
        bg: "bg-indigo-100",
        bgHover: "hover:bg-indigo-200",
        border: "border-indigo-300",
        text: "text-indigo-500",
    },
    SUN: {
        bg: "bg-purple-100",
        bgHover: "hover:bg-purple-200",
        border: "border-purple-300",
        text: "text-purple-500",
    },
    NONE: {
        bg: "bg-gray-100",
        bgHover: "hover:bg-gray-200",
        border: "border-gray-300",
        text: "text-gray-500",
    },
};

export default dayColors