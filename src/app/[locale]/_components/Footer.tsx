import { Group, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandInstagram } from "@tabler/icons-react";

export default function Footer() {
    return (
        <div className="flex gap-1 flex-wrap">
            <Text size="xs" c={"dimmed"}>KU Get Reg - {process.env.NEXT_PUBLIC_BUILD_MESSAGE ?? ""}</Text>
            <Text size="xs" c={"dimmed"}>|</Text>
            <a target="_blank" href="https://github.com/ku-t3ch/kugeterg">
                <Text className="flex gap-1" size="xs" c={"dimmed"}>Open Source on <IconBrandGithub size={16} /></Text>
            </a>
            <Text size="xs" c={"dimmed"}>|</Text>
            <a target="_blank" href="https://www.instagram.com/teerut_1t" className="flex gap-1">
                <Text size="xs" c={"dimmed"}>แจ้งปัญหา</Text>
                <Text c="blue" td="underline" size="xs" component={Group} gap={2}>
                    <IconBrandInstagram size={16} /><Text>teerut_1t</Text>
                </Text>
            </a>
            <span>
                <Text size="xs" c={"red"}>*ระบบนี้ไม่ใช่ของมหาวิทยาลัย ระบบนี้สร้างขึ้นเพื่ออำนวยความสะดวกให้แก่เพื่อนนิสิตด้วยกันเองเท่านั้น</Text>
            </span>
        </div>
    )
}