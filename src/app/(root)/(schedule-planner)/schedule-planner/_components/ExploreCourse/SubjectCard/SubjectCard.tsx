"use client";

import { type IOpenSubjectForEnrollResponse } from "@/types/responses/IOpenSubjectForEnrollResponse";
import { Paper, Stack, Group, Text, Badge, Collapse, ActionIcon, Divider, Button, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp, IconUser } from "@tabler/icons-react";
import _ from "lodash";
import React, { } from "react";
import { convertKeyToDate } from "utils/daysMap";

interface Props {
    course: IOpenSubjectForEnrollResponse
}

function SubjectCard(props: Props) {
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


    return (
        <Paper p="xs" withBorder className="relative">
            <div className="absolute top-1 right-3">
                <ActionIcon variant="subtle" size={"md"} onClick={toggle}>
                    {opened ? <IconChevronUp /> : <IconChevronDown />}
                </ActionIcon>
            </div>

            <Stack gap={2}>
                {/* <Alert mb={"md"} variant="light" color="red" title="Time conflict with" icon={<IconInfoCircle />}>
                                        <Stack>
                                            <Text lineClamp={1} size="sm">- (01418332-65) Information System Security</Text>
                                        </Stack>
                                    </Alert> */}
                <Group gap={3}>
                    <Text size="sm" fw={700}>{props.course.subjectCode}</Text>
                    <Text size="xs" c="dimmed">[ {props.course.maxCredit} Credit ]</Text>
                </Group>
                <Text lineClamp={1} size="sm">{props.course.subjectNameEn}</Text>
                <Group justify="space-between">
                    <Group gap={2}>
                        <Text lineClamp={1} size="xs">Sec {props.course.sectionCode}</Text>
                        <Text lineClamp={1} size="xs">|</Text>
                        <Text lineClamp={1} size="xs">{props.course.sectionTypeEn}</Text>
                    </Group>
                    <Group gap={2} align="center">
                        <IconUser color={calculateSearPercentageColor()} size={13} />
                        <Text c={calculateSearPercentageColor()} lineClamp={1} size="sm">{props.course.totalRegistered}/{props.course.totalSeat}</Text>
                    </Group>
                </Group>
                <Group gap={2}>
                    {CoursedateConverter(props.course.coursedate).map((item, index) => (
                        <Badge variant="light" tt="none" color={item.dayMap?.color} size="xs" key={index}>{item.dayMap?.en}</Badge>
                    ))}
                </Group>
                <Collapse in={opened}>
                    <Divider my={10} />
                    <Stack gap={0}>
                        <Group align="start">
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">Teacher</Text>
                                {TeacherNameConverter(props.course.teacherNameEn).map((item, index) => (
                                    <Text key={index} size="xs">{item}</Text>
                                ))}
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">Time</Text>
                                {CoursedateConverter(props.course.coursedate).map((item, index) => (
                                    <Text size="xs" key={index}>{item.day} {item.time}</Text>
                                ))}
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">Room</Text>
                                <Text size="xs">{props.course.roomNameEn}</Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">Eligible Major</Text>
                                <Text size="xs">{props.course.property ?? "-"}</Text>
                            </Stack>
                            <Stack gap={2}>
                                <Text size="xs" c="dimmed">Ineligible Major</Text>
                                <Text size="xs">{props.course.nonProperty ?? "-"}</Text>
                            </Stack>
                        </Group>
                        <Group justify="end">
                            <Button size="xs" variant="gradient">Add to Schedule</Button>
                        </Group>
                    </Stack>
                </Collapse>
            </Stack>
        </Paper>
    )
}

const SubjectCardMemo = React.memo(SubjectCard);

export default SubjectCardMemo;