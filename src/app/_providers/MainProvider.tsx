"use client";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.layer.css';
import '@/styles/globals.css';

import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';

import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

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
                        {children}
                    </ConfigProvider>
                </MantineProvider>
            </SessionProvider>
        </Suspense>
    );
}
