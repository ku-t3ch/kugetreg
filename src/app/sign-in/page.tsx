"use client";
import { signIn } from "next-auth/react";
import {
    Alert,
    Button,
    Card,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import { IconError404, IconLock, IconUser, IconX } from "@tabler/icons-react";
import { useParams, useSearchParams } from "next/navigation";
import Footer from "../_components/Footer";
import { useState } from "react";

export default function Page() {
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <Card maw={400} w={"100%"}>
                <Stack>
                    <Text size="xl" fw={600}>
                        Sign In
                    </Text>
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

                            try {
                                await signIn("credentials", {
                                    username: username,
                                    password: password,
                                    callbackUrl: "/",
                                });
                                setLoading(false);
                            } catch (error) {
                                setLoading(false);
                                console.error(error);
                            }
                        }}
                    >
                        {searchParams.get("error") &&
                            <Alert variant="light" color="red" title="Error" icon={<IconX size={15} />}>
                                {searchParams.get("error")?.toString()}
                            </Alert>
                        }

                        <TextInput
                            size="md"
                            label="Username"
                            placeholder="เช่น b63xxxxxxxx หรือ regxxx"
                            name="username"
                            required
                            leftSection={<IconUser size={16} />}
                        />
                        <PasswordInput
                            size="md"
                            label="Password"
                            placeholder="รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี"
                            required
                            name="password"
                            leftSection={<IconLock size={16} />}
                        />
                        <Button loading={loading} loaderProps={{ size: "xs" }} size="md" type="submit" fullWidth>
                            Sign in
                        </Button>
                        <Footer />
                    </form>
                </Stack>
            </Card>
        </div>
    );
}

export const dynamic = "force-dynamic";
