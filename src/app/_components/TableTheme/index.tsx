"use client";
import { type ITableCourseProps } from "@/types/ITableCourseProps";
import Theme01 from "./Theme01/Theme01";
import DefaultTheme from "./DefaultTheme/DefaultTheme";

export default function TableTheme(props: ITableCourseProps) {
    const target = "Theme01";

    const listTheme = {
        "DefaultTheme": DefaultTheme,
        "Theme01": Theme01
    }

    return (
        <div className="min-w-fit">
            {listTheme[target](props)}
        </div>
    )
}