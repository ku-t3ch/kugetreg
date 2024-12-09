import { Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Footer() {
    return (
        <div className="flex gap-1">
            <Text size="xs" c={"dimmed"}>KU Get Reg - {process.env.NEXT_PUBLIC_BUILD_MESSAGE ?? ""}</Text>
            <Text size="xs" c={"dimmed"}>|</Text>
            <a target="_blank" href="https://github.com/ku-t3ch/kugeterg" className="flex gap-1">
                <Text size="xs" c={"dimmed"}>Open Source on</Text>
                <Text size="xs" c={"dimmed"}><IconBrandGithub size={16} /></Text>
            </a>
        </div>
    )
}