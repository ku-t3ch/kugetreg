"use client";

import { useRouter } from "@/i18n/routing";
import { Text, UnstyledButton } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

interface Props {
    href?: string;
    label?: string;
}

export default function BackButton({ href, label }: Props) {
    const router = useRouter();
    const t = useTranslations()
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
                <Text size="xs">{label ?? t("common.button.back")}</Text>
            </div>
        </UnstyledButton>
    );
}