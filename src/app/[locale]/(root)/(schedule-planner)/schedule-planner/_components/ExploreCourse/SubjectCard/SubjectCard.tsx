"use client";

import _ from 'lodash';
import React from 'react';
import { convertKeyToDate } from 'utils/daysMap';

import {
    type IOpenSubjectForEnrollResponse, OpenSubjectForEnrollSchemaToCourse
} from '@/types/responses/IOpenSubjectForEnrollResponse';
import {
    ActionIcon, Alert, Badge, Button, Collapse, Divider, Group, Paper, Stack, Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp, IconInfoCircle, IconPlus, IconUser } from '@tabler/icons-react';

import useCoursePlanningStore from '../../../_store/useCoursePlanningStore';
import { useTranslations } from 'next-intl';

interface Props {
    course: IOpenSubjectForEnrollResponse
}

function SubjectCard(props: Props) {
    const t = useTranslations();
    const coursePlanningStore = useCoursePlanningStore()
    const [opened, { toggle }] = useDisclosure(true);

    const CoursedateConverter = (coursedateen: string) => {
        return _.sortBy(coursedateen.split(',').map((item) => {
            const day = (item.split('  ')[0])?.trim();
            const time = (item.split('  ')[1])?.trim();
            return {
                day,
                time,
                dayMap: convertKeyToDate(day ?? "")
            }
        }), o => o.dayMap?.value);
    }

    const TeacherNameConverter = (teacherName: string) => {
        return teacherName.split(',').map((item) => {
            return item.trim();
        });
    }

    const seatIsFull = parseInt(props.course.totalSeat) >= parseInt(props.course.totalRegistered);

    const calculateSearPercentageColor = () => {
        const percentage = (parseInt(props.course.totalRegistered) / parseInt(props.course.totalSeat)) * 100;
        if (percentage >= 100) {
            return "red";
        } else if (percentage >= 80) {
            return "orange";
        } else if (percentage >= 60) {
            return "yellow";
        } else {
            return "green";
        }
    }

    const onAddToSchedule = (course: IOpenSubjectForEnrollResponse) => {
        const result = OpenSubjectForEnrollSchemaToCourse.parse(course);
        coursePlanningStore.addCourse(result);
    }

    const resultConvert = OpenSubjectForEnrollSchemaToCourse.parse(props.course);

    const isConflict = coursePlanningStore.checkIsConflict(resultConvert).length > 0;

    return (
        <Paper p="xs" withBorder className="relative">
            <div className="absolute top-1 right-3">
                <ActionIcon variant="subtle" size={"md"} onClick={toggle}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </div>

            <Stack gap={2}>
                {isConflict && <Alert mb={"sm"} w={"90%"} variant="light" color="red" title={t("schedule_planner.explore.subject.card.timeConflict")} icon={<IconInfoCircle />}>
                    <Stack gap={0}>
                        {coursePlanningStore.checkIsConflict(resultConvert).map((item, index) => (
                            <Text key={index} lineClamp={1} size="sm">
                                - ({item.subject_code}) {t("common.mask.subject.subject_name", {
                                    subject_name_en: item.subject_name_en,
                                    subject_name_th: item.subject_name_th
                                })}
                            </Text>
                        ))}
                    </Stack>
                </Alert>}
                <Group gap={3}>
                    <Text size="sm" fw={700}>{props.course.subjectCode}</Text>
                    <Text size="xs" c="dimmed">[ {props.course.maxCredit} {t("common.subject.credits")} ]</Text>
                </Group>
                <Text lineClamp={1} size="sm">
                    {t("common.mask.subject.subjectName", {
                        subjectNameEn: props.course.subjectNameEn,
                        subjectNameTh: props.course.subjectNameTh
                    })}
                </Text>
                <Group justify="space-between">
                    <Group gap={2}>
                        <Text lineClamp={1} size="xs">{t("common.subject.section")} {props.course.sectionCode}</Text>
                        <Text lineClamp={1} size="xs">|</Text>
                        <Text lineClamp={1} size="xs">
                            {t("common.mask.subject.sectionType", {
                                sectionTypeTh: props.course.sectionTypeTh,
                                sectionTypeEn: props.course.sectionTypeEn
                            })}
                        </Text>
                        <Text lineClamp={1} size="xs">|</Text>
                        <Badge variant='dot' size='xs' tt="none" color={props.course.stdStatusEn === "Special" ? "orange" : "blue"}>
                            {t("common.mask.subject.stdStatus", {
                                stdStatusTh: props.course.stdStatusTh,
                                stdStatusEn: props.course.stdStatusEn
                            })}
                        </Badge>
                    </Group>
                    <Group gap={2} align="center">
                        <IconUser color={calculateSearPercentageColor()} size={13} />
                        <Text c={calculateSearPercentageColor()} lineClamp={1} size="sm">{props.course.totalRegistered}/{props.course.totalSeat}</Text>
                    </Group>
                </Group>
                <Group gap={2}>
                    {props.course.coursedate && CoursedateConverter(props.course.coursedate).map((item, index) => (
                        <Badge variant="light" tt="none" color={item.dayMap?.color} size="xs" key={index}>
                            {t("common.mask.subject.day", {
                                th: item.dayMap?.th,
                                en: item.dayMap?.en
                            })}
                        </Badge>
                    ))}
                </Group>
                <Collapse in={opened}>
                    <Divider my={10} />
                    <Stack gap={0}>
                        <Group align="start">
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">{t("common.subject.teacher")}</Text>
                                {TeacherNameConverter(t("common.mask.subject.teacherName", {
                                    teacherName: props.course.teacherName,
                                    teacherNameEn: props.course.teacherNameEn
                                })).map((item, index) => (
                                    <Text key={index} size="xs">{item}</Text>
                                ))}
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">{t("common.subject.time")}</Text>
                                {props.course.coursedate && CoursedateConverter(props.course.coursedate).map((item, index) => (
                                    <Text size="xs" key={index}>{item.day} {item.time}</Text>
                                ))}
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">{t("common.subject.room")}</Text>
                                <Text size="xs">
                                    {t("common.mask.subject.roomName", {
                                        roomNameEn: props.course.roomNameEn,
                                        roomNameTh: props.course.roomNameTh,
                                    })}
                                </Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">{t("common.subject.eligibleMajor")}</Text>
                                <Text size="xs">{props.course.property ?? "-"}</Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">{t("common.subject.ineligibleMajor")}</Text>
                                <Text size="xs">{props.course.nonProperty ?? "-"}</Text>
                            </Stack>
                        </Group>
                        <Group justify="end">
                            <Button disabled={isConflict} onClick={() => onAddToSchedule(props.course)} leftSection={<IconPlus size={16} />} size="xs" variant="gradient">
                                {isConflict ? t("schedule_planner.explore.subject.card.button.canNotAdd") : t("schedule_planner.explore.subject.card.button.canAdd")}
                            </Button>
                        </Group>
                    </Stack>
                </Collapse>
            </Stack>
        </Paper>
    )
}

const SubjectCardMemo = React.memo(SubjectCard);

export default SubjectCardMemo;