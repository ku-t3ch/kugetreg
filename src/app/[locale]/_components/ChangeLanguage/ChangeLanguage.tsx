"use client";

import { useLocale } from 'next-intl';

import { getFlagMap, langs } from '@/configs/common/langs';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button, Combobox, Group, useCombobox } from '@mantine/core';

export default function ChangeLanguage() {
    const router = useRouter()
    const pathname = usePathname();
    const locale = useLocale();

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });
    return (
        <Combobox
            width={150}
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
                <Button variant="light" size="compact-sm" onClick={() => combobox.toggleDropdown()} tt="none" color="blue" c={"black"}>
                    <Group gap={10}>
                        <img src={getFlagMap(locale ?? "th").flag} className='w-4' />
                        {getFlagMap(locale ?? "th").label}
                    </Group>
                </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {langs.map((lang) => (
                        <Combobox.Option value={lang} key={lang}>
                            <Group gap={10}>
                                <img src={getFlagMap(lang ?? "th").flag} className='w-6' />
                                {getFlagMap(lang ?? "th").label}
                            </Group>
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    )
}