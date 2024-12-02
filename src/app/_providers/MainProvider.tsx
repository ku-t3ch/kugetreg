"use client";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.layer.css';
import '@/styles/globals.css';

import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { Suspense, useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

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

    useEffect(() => {
        clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID!);
    }, []);

    return (
        <Suspense>
            <SessionProvider>
                <MantineProvider theme={theme} defaultColorScheme="light">
                    <ConfigProvider>
                        <Notifications position="top-right" />
                        <ModalsProvider modalProps={{ centered: true }}>{children}</ModalsProvider>
                    </ConfigProvider>
                </MantineProvider>
            </SessionProvider>
        </Suspense>
    );
}
