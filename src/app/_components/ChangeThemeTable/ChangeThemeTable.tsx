"use client";
import { useTableTheme } from "@/app/_store/useTableTheme"
import { Select } from "@mantine/core"

export default function ChangeThemeTable() {
    const tableTheme = useTableTheme()
    return (
        <>
            <Select
                placeholder="Select theme"
                defaultValue={"DefaultTheme"}
                value={tableTheme.currentTheme}
                data={Object.keys(tableTheme.getThemeList()).map((theme) => ({ value: theme, label: theme }))}
                onChange={(value) => tableTheme.setTheme(value!)}
                allowDeselect={false}
            />
        </>
    )
}