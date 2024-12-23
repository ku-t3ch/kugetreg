"use client";

import { api } from "@/trpc/react";
import { formatInTimeZone } from 'date-fns-tz'
import { Group, Paper, Progress, Stack, Table, Text } from "@mantine/core";
import _ from "lodash";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()

    const id = searchParams.get("id");

    const creditManagement = api.download.getCreditManagementFromRedis.useQuery({ id: id?.toString() ?? "" })
    // const creditManagement = api.creditManagement.getCreditManagement.useQuery()

    const generalEducationWatch = creditManagement.data?.general_education
    const specificCoursesWatch = creditManagement.data?.specific_courses
    const freeElectiveWatch = creditManagement.data?.free_elective

    const totalCreditGeneralEducation = _.sumBy(generalEducationWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditGeneralEducation = _.sumBy(generalEducationWatch, (x) => x.minCredit)
    const percentGeneralEducation = ((totalCreditGeneralEducation / requiredCreditGeneralEducation) * 100) || 0

    const totalCreditSpecificCourses = _.sumBy(specificCoursesWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditSpecificCourses = _.sumBy(specificCoursesWatch, (x) => x.minCredit)
    const percentSpecificCourses = ((totalCreditSpecificCourses / requiredCreditSpecificCourses) * 100) || 0

    const totalCreditFreeElective = _.sumBy(freeElectiveWatch, (x) => _.sumBy(x.subjects, (y) => y.credit))
    const requiredCreditFreeElective = _.sumBy(freeElectiveWatch, (x) => x.minCredit)
    const percentFreeElective = ((totalCreditFreeElective / requiredCreditFreeElective) * 100) || 0


    const mergedGroup = _.concat(generalEducationWatch, specificCoursesWatch, freeElectiveWatch)
    const mergedCourses = _.concat(
        _.flatMap(generalEducationWatch, (x) => x.subjects),
        _.flatMap(specificCoursesWatch, (x) => x.subjects),
        _.flatMap(freeElectiveWatch, (x) => x.subjects)
    )

    const mergedGroupWithSubjects = _.chain(mergedGroup)
        .groupBy('groupName').map((value, key) => ({
            groupName: key,
            minCredit: value[0]?.minCredit,
            subjects: _.flatMap(value, (x) => x?.subjects)
        }))
        .value();

    console.log(mergedGroupWithSubjects);


    return (
        <div className="a4-vertical p-5">
            <Stack>
                <Group justify="space-between" align="flex-start">
                    <Stack gap={0}>
                        <Text size="xl" fw={700}>KU Get Reg</Text>
                        <Text size="xl" fw={700}>ระบบบริหารหน่วยกิต</Text>
                    </Stack>
                    <Stack gap={0} justify="flex-start" align="flex-end">
                        <Group gap={3} align="baseline">
                            <Text fw={700} size="xl">
                                {_.sumBy(mergedCourses, (x) => x.credit ?? 0)}/{_.sumBy(mergedGroup, (x) => x?.minCredit ?? 0)}
                            </Text>
                            <Text size="sm" c="dimmed">หน่วยกิต</Text>
                        </Group>
                        <Text c={"dimmed"} size="xs">สร้างเมื่อ {formatInTimeZone(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss")}</Text>
                    </Stack>
                </Group>
                <Group wrap="nowrap">
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <div>
                                <Text c="dimmed" fw={700}>
                                    หมวดวิชาศึกษาทั่วไป
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditGeneralEducation}/{requiredCreditGeneralEducation}
                                    </Text>
                                    <Text size="sm" c="dimmed">หน่วยกิต</Text>
                                </Group>

                            </div>
                        </Group>
                        <Progress w={"100%"} value={percentGeneralEducation} />
                    </Paper>
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <div>
                                <Text c="dimmed" fw={700}>
                                    หมวดวิชาเฉพาะ
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditSpecificCourses}/{requiredCreditSpecificCourses}
                                    </Text>
                                    <Text size="sm" c="dimmed">หน่วยกิต</Text>
                                </Group>
                            </div>
                        </Group>
                        <Progress w={"100%"} value={percentSpecificCourses} />
                    </Paper>
                    <Paper withBorder radius="md" p="xs" w={"100%"}>
                        <Group wrap="nowrap">
                            <div>
                                <Text c="dimmed" fw={700}>
                                    หมวดเลือกเสรี
                                </Text>
                                <Group gap={3} align="baseline">
                                    <Text fw={700} size="xl">
                                        {totalCreditFreeElective}/{requiredCreditFreeElective}
                                    </Text>
                                    <Text size="sm" c="dimmed">หน่วยกิต</Text>
                                </Group>
                            </div>
                        </Group>
                        <Progress w={"100%"} value={percentFreeElective} />
                    </Paper>
                </Group>
                <Stack gap={3}>
                    <Text size="xl" fw={700}>ตามกลุ่มสาระ</Text>
                    <Table withTableBorder withColumnBorders withRowBorders striped>
                        <Table.Thead className="bg-sky-200">
                            <Table.Tr>
                                <Table.Th w={400}>กลุ่มสาระ</Table.Th>
                                <Table.Th>สถานะ</Table.Th>
                                <Table.Th>ขั้นต่ำ</Table.Th>
                                <Table.Th>เรียนแล้ว</Table.Th>
                                <Table.Th>คงเหลือ</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {mergedGroup.map((group, key) => (
                                <Table.Tr key={key}>
                                    <Table.Td><Text lineClamp={1}>{group?.groupName}</Text></Table.Td>
                                    <Table.Td>
                                        <Text>{Math.min(100, (_.sumBy(group?.subjects, (x) => x.credit) / (group?.minCredit ?? 0) * 100)).toFixed(2)} %</Text>
                                    </Table.Td>
                                    <Table.Td align="center">
                                        <Text>{group?.minCredit.toLocaleString("th-TH")}</Text>
                                    </Table.Td>
                                    <Table.Td align="center">
                                        <Text>{_.sumBy(group?.subjects, (x) => x.credit).toLocaleString("th-TH")}</Text>
                                    </Table.Td>
                                    <Table.Td align="center">
                                        <Text>
                                            {Math.max(0, (group?.minCredit ?? 0) - _.sumBy(group?.subjects, (x) => x.credit)).toLocaleString("th-TH")}
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Stack>
                <Stack gap={3}>
                    <Text size="xl" fw={700}>ตามรายวิชา</Text>
                    <Table withTableBorder withColumnBorders withRowBorders striped>
                        <Table.Thead className="bg-sky-200">
                            <Table.Tr>
                                <Table.Th w={120}>รหัสวิชา</Table.Th>
                                <Table.Th miw={"100%"}>รายวิชา</Table.Th>
                                <Table.Th align="center" w={50}>หน่วยกิต</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {Array.isArray(mergedGroupWithSubjects) && mergedGroupWithSubjects.map((group, key) => (
                                <>
                                    <Table.Tr key={key}>
                                        <Table.Td colSpan={2}><Text lineClamp={1} fw={700}>{group.groupName}</Text></Table.Td>
                                        <Table.Td align="center">
                                            <Text lineClamp={1} fw={700}>
                                                {_.sumBy(group.subjects, (x) => x?.credit ?? 0).toLocaleString("th-TH")}
                                                /{group.minCredit?.toLocaleString("th-TH")}
                                            </Text>
                                        </Table.Td>
                                    </Table.Tr>
                                    {group.subjects.map((course, key2) => (
                                        <Table.Tr key={key2}>
                                            <Table.Td><Text lineClamp={1}>{course?.subjectCode}</Text></Table.Td>
                                            <Table.Td><Text lineClamp={1}>{course?.subjectNameTh}</Text></Table.Td>
                                            <Table.Td align="center"><Text lineClamp={1}>{course?.credit}</Text></Table.Td>
                                        </Table.Tr>
                                    ))}
                                </>

                            ))}
                        </Table.Tbody>
                    </Table>
                </Stack>
            </Stack>
        </div>
    )
}