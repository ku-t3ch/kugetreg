"use client";

import { getFlagMap, langs } from "@/configs/common/langs";
import { Button, Combobox, useCombobox } from "@mantine/core";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function ChangeLanguage() {
    const {  } = useLocale()
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    const [value, setValue] = useState<string | null>(null);
    return (
        <Combobox
            width={250}
            shadow="xl"
            position="bottom-end"
            withArrow
            store={combobox}
            onOptionSubmit={(val) => {
                setValue(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <Button variant="light" size="compact-sm" onClick={() => combobox.toggleDropdown()} tt="none" color="blue">
                    {getFlagMap(value ?? "en").label}
                </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {langs.map((lang) => (
                        <Combobox.Option value={lang} key={lang}>
                            {getFlagMap(lang ?? "en").label}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}