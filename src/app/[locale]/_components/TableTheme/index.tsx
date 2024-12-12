"use client";

import { type ITableCourseProps } from "@/types/ITableCourseProps";
import { listTheme, useTableTheme } from "@/app/[locale]/_store/useTableTheme";
import { useEffect } from "react";

export default function TableTheme(props: ITableCourseProps) {
    const tableTheme = useTableTheme()

    useEffect(() => {
        if (props.theme) {
            tableTheme.setTheme(props.theme)
        }
    }, [props.theme]);

    return (
        <div className="min-w-fit" id="capture">
            {tableTheme.currentTheme && listTheme[tableTheme.currentTheme as keyof typeof listTheme ?? "default_theme_desktop"]({ ...props })}
        </div>
    )
}