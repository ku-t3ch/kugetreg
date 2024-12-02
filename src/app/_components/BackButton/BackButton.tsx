"use client";

import { Text, UnstyledButton } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface Props {
    href?: string;
    label?: string;
}

export default function BackButton({ href, label }: Props) {
    const router = useRouter();
    return (
        <UnstyledButton
            className="w-fit"
            variant="transparent"
            size="compact-xs"
            c={"dimmed"}
            onClick={() => href ? router.push(href) : router.back()}
        >
            <div className="flex items-center gap-1">
                <IconArrowLeft size={15} />
                <Text size="xs">{label ?? "ย้อนกลับ"}</Text>
            </div>
        </UnstyledButton>
    );
}