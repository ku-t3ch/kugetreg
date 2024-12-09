"use client";

import { useLocale } from 'next-intl';

import { getFlagMap, langs } from '@/configs/common/langs';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button, Combobox, useCombobox } from '@mantine/core';

export default function ChangeLanguage() {
    const router = useRouter()
    const pathname = usePathname();
    const locale = useLocale();

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    return (
        <Combobox
            width={250}
            shadow="xl"
            position="bottom-end"
            withArrow
            store={combobox}
            onOptionSubmit={(val) => {
                router.replace(
                    { pathname },
                    { locale: val }
                );
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <Button variant="light" size="compact-sm" onClick={() => combobox.toggleDropdown()} tt="none" color="blue">
                    {getFlagMap(locale ?? "th").label}
                </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {langs.map((lang) => (
                        <Combobox.Option value={lang} key={lang}>
                            {getFlagMap(lang ?? "th").label}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}