"use client";
import { signIn } from "next-auth/react";
import {
    Alert,
    Button,
    Card,
    Group,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { IconClock, IconLock, IconUser, IconX } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import Footer from "../_components/Footer";
import { useState } from "react";
import { useTranslations } from "next-intl";
import ChangeLanguage from "../_components/ChangeLanguage/ChangeLanguage";

export default function Page() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false);
    const t = useTranslations('sign_in');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Card maw={400} w={"100%"}>
                <Stack>
                    <Group justify="space-between">
                        <Text size="xl" fw={600}>
                            {t("title")}
                        </Text>
                        <ChangeLanguage />
                    </Group>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setLoading(true);
                            const form = e.target as HTMLFormElement;
                            const username = (
                                form.elements.namedItem("username") as HTMLInputElement
                            ).value;
                            const password = (
                                form.elements.namedItem("password") as HTMLInputElement
                            ).value;
                            // const otp = (
                            //     form.elements.namedItem("otp") as HTMLInputElement
                            // ).value;
                            const otp = (
                                form.elements.namedItem("otp") as HTMLInputElement
                            )?.value ?? "";

                            try {
                                await signIn("credentials", {
                                    username,
                                    password,
                                    otp,
                                    callbackUrl: "/",
                                });
                                setLoading(false);
                            } catch (error) {
                                setLoading(false);
                                console.error(error);
                            }
                        }}
                    >
                        {searchParams.get("code") &&
                            <Alert variant="light" color="red" title="Error" icon={<IconX size={15} />}>
                                {searchParams.get("code")?.toString()}
                            </Alert>
                        }

                        <TextInput
                            size="md"
                            label={t("username.input.label")}
                            placeholder={t("username.input.placeholder")}
                            name="username"
                            required
                            leftSection={<IconUser size={16} />}
                        />
                        <PasswordInput
                            size="md"
                            label={t("password.input.label")}
                            placeholder={t("password.input.placeholder")}
                            required
                            name="password"
                            leftSection={<IconLock size={16} />}
                        />
                        {/* <TextInput
                            size="md"
                            label={t("otp.input.label")}
                            placeholder={t("otp.input.placeholder")}
                            name="otp"
                            required
                            leftSection={<IconClock size={16} />}
                        /> */}
                        <Button loading={loading} loaderProps={{ size: "xs" }} size="md" type="submit" fullWidth>
                            {t("button")}
                        </Button>
                        <Footer />
                    </form>
                </Stack>
            </Card>
        </div>
    );
}

export const dynamic = "force-dynamic";
