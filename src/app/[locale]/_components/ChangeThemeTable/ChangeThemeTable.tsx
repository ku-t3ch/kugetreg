"use client";
import { useTableTheme } from "@/app/[locale]/_store/useTableTheme"
import { Select } from "@mantine/core"
import { useTranslations } from "next-intl";

export default function ChangeThemeTable() {
    const tableTheme = useTableTheme()
    const t = useTranslations()
    return (
        <>
            <Select
                placeholder={t("common.select.changeTheme.placeholder")}
                value={tableTheme.currentTheme}
                data={Object.keys(tableTheme.getThemeList()).map((theme) => ({ value: theme, label: theme }))}
                onChange={(value) => tableTheme.setTheme(value!)}
                allowDeselect={false}
            />
        </>
    )
}