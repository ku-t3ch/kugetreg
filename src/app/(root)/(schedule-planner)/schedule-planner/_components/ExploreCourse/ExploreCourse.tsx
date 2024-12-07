"use client";

import React, { useEffect, useState } from 'react';

import { api } from '@/trpc/react';
import {
    ActionIcon, CloseButton, Combobox, Group, Loader, Stack, Text, TextInput, useCombobox
} from '@mantine/core';
import { IconFilter, IconSearch } from '@tabler/icons-react';

import SubjectCardMemo from './SubjectCard/SubjectCard';
import _ from 'lodash';

export default function ExploreCourse() {
    const searchSubjectOpenEnr = api.enroll.searchSubjectOpenEnr.useMutation();
    const openSubjectForEnroll = api.enroll.openSubjectForEnroll.useMutation()

    const [searchValue, setSearchValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState("");

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchValue);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue]);

    useEffect(() => {
        if (debouncedValue) {
            searchSubjectOpenEnr.mutate({
                query: debouncedValue,
            });
        }
    }, [debouncedValue]);

    const autocompleteOnChange = (value: string) => {
        if (value === "") {
            searchSubjectOpenEnr.reset();
        }
        setSearchValue(value);
    }

    const onOptionSubmit = (value: string) => {
        setSearchValue(value);
        openSubjectForEnroll.mutate({
            query: value,
        })
    }

    return (
        <Stack gap={5}>
            <Group justify="space-between">
                <Group gap={"xs"}>
                    <Text size="md" fw={700}>
                        ค้นหารายวิชา
                    </Text>
                    {(openSubjectForEnroll.data?.results && openSubjectForEnroll.data?.results.length > 0) && <Text size="xs" c="dimmed">
                        {openSubjectForEnroll.data?.results.length} results
                    </Text>}
                </Group>
                {/* <ActionIcon variant="subtle" color="gray">
                    <IconFilter size={16} />
                </ActionIcon> */}
            </Group>
            <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    onOptionSubmit(val);
                    combobox.closeDropdown();
                }}
            >
                <Combobox.Target>
                    <TextInput
                        size='lg'
                        placeholder="รหัสวิชา, ชื่อวิชา"
                        leftSection={<IconSearch size={16} />}
                        rightSection={searchSubjectOpenEnr.isPending ? <Loader size={18} /> : <CloseButton
                            aria-label="Clear input"
                            onClick={() => {
                                autocompleteOnChange("");
                            }}
                            style={{ display: searchValue ? undefined : 'none' }}
                        />}
                        value={searchValue}
                        onChange={(event) => {
                            autocompleteOnChange(event.currentTarget.value);
                        }}
                        onClick={() => combobox.openDropdown()}
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => combobox.closeDropdown()}
                    />
                </Combobox.Target>
                {searchSubjectOpenEnr.data?.subjects && searchSubjectOpenEnr.data?.subjects.length > 0 && <Combobox.Dropdown>
                    <Combobox.Options mah={300} style={{ overflowY: 'auto' }}>
                        {searchSubjectOpenEnr.data?.subjects.map((item, index) => (
                            <Combobox.Option value={item.subjectCode} key={index}>
                                <Group gap="sm" >
                                    <div>
                                        <Text size="sm">{item.subjectCode}</Text>
                                        <Text lineClamp={1} size="sm" c="dimmed">
                                            {item?.subjectNameTh}
                                        </Text>
                                        <Text lineClamp={1} size="sm" c="dimmed">
                                            {item?.subjectNameEn}
                                        </Text>
                                    </div>
                                </Group>
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Combobox.Dropdown>}

            </Combobox>

            {/* <ScrollArea scrollHideDelay={0} h={"calc(-10rem + 100vh)"}> */}
            <Stack gap={10} mt={5}>
                {_.sortBy(openSubjectForEnroll.data?.results, o => parseInt(o.sectionCode)).map((course, index) => (
                    <SubjectCardMemo key={index} course={course} />
                ))}
            </Stack>
            {/* </ScrollArea> */}
        </Stack>
    );
}
