"use client";
import { createTheme, MantineProvider } from "@mantine/core";
import { ConfigProvider } from "antd";

import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.layer.css";
import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  fontFamily: "var(--font-sans)",

  radius: {
    sm: "0.75rem",
  },
});

export default function MainProvider({ children }: Props) {
  return (
    <Suspense>
      <SessionProvider>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <ConfigProvider>
            <Notifications position="top-right" />
            <ModalsProvider>{children}</ModalsProvider>
          </ConfigProvider>
        </MantineProvider>
      </SessionProvider>
    </Suspense>
  );
}
