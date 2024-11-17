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
import { IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import Footer from "../_components/Footer";

export default function Page() {
  const params = useParams<{ error: string }>();
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
              const form = e.target as HTMLFormElement;
              const username = (
                form.elements.namedItem("username") as HTMLInputElement
              ).value;
              const password = (
                form.elements.namedItem("password") as HTMLInputElement
              ).value;

              await signIn("credentials", {
                username: username,
                password: password,
                callbackUrl: "/",
              });
            }}
          >
            {params.error && <Alert color="red">{params.error}</Alert>}

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
            <Button size="md" type="submit" fullWidth>
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
