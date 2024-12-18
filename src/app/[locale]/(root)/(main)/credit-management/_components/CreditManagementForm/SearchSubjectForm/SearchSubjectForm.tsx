"use client"

import React, { useEffect, useState } from 'react';
import { type Control, Controller, type Path } from 'react-hook-form';

import {
    type CreditManagementSchemaType
} from '@/schemas/creditManagement/creditManagement.schema';
import { api } from '@/trpc/react';
import {
    CloseButton, Combobox, Group, Loader, Text, TextInput, type TextInputProps, useCombobox
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { type SubjectSchemaType } from '@/schemas/creditManagement/subject.schema';
import { useTranslations } from 'next-intl';

interface SearchSubjectFormProps {
    control: Control<CreditManagementSchemaType>;
    name: Path<CreditManagementSchemaType>;
    props?: TextInputProps;
}

const ControlledSearchSubject = (
    props: SearchSubjectFormProps,
) => {
    const t = useTranslations();
    const searchSubjectOpenEnr = api.enroll.searchSubjectOpenEnr.useMutation();

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

    const autocompleteOnChange = (value: string) => {
        if (value === "") {
            searchSubjectOpenEnr.reset();
        }
        setSearchValue(value);
    }

    useEffect(() => {
        if (debouncedValue) {
            searchSubjectOpenEnr.mutate({
                query: debouncedValue,
            });
        }
    }, [debouncedValue]);

    return (
        <Controller
            rules={{ required: true }}
            name={props.name}
            control={props.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                    <Combobox
                        store={combobox}
                        onOptionSubmit={(val) => {
                            const subject = searchSubjectOpenEnr.data?.subjects?.find((item) => item.subjectCode === val);
                            if (subject) {
                                const payload: SubjectSchemaType = {
                                    credit: Number.parseInt(subject.credit),
                                    subjectCode: subject.subjectCode,
                                    subjectNameEn: subject.subjectNameEn,
                                    subjectNameTh: subject.subjectNameTh,
                                    isEdit: false,
                                }
                                onChange(payload);
                                combobox.closeDropdown();
                            }
                        }}
                    >
                        <Combobox.Target>
                            <TextInput
                                leftSection={<IconSearch size={16} />}
                                rightSection={searchSubjectOpenEnr.isPending ? <Loader size={18} /> : <CloseButton
                                    aria-label="Clear input"
                                    onClick={() => {
                                        autocompleteOnChange("");
                                    }}
                                    style={{ display: searchValue ? undefined : 'none' }}
                                />}
                                placeholder={t('schedule_planner.explore.subject.input.placeholder')}
                                value={searchValue}
                                onChange={(event) => {
                                    autocompleteOnChange(event.currentTarget.value);
                                }}
                                onClick={() => combobox.openDropdown()}
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                {...props.props}
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
                )
            }}
        />

    );
};

export default ControlledSearchSubject;
