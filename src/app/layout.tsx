import '@/styles/globals.css';

import { type Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Noto_Sans_Thai } from 'next/font/google';

import { TRPCReactProvider } from '@/trpc/react';
import { ColorSchemeScript } from '@mantine/core';
import { GoogleTagManager } from '@next/third-parties/google';

import MainProvider from './_providers/MainProvider';

export const metadata: Metadata = {
    title: "KU Get Reg: จัดตารางเรียน",
    description:
        "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
    metadataBase: new URL('https://kugetreg.teerut.com')
};

const fontSansNoto_Sans_Thai = Noto_Sans_Thai({
    subsets: ["latin", "thai"],
    variable: "--font-sans",
});

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {

    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <ColorSchemeScript />
            </head>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!} />
            <body className={fontSansNoto_Sans_Thai.className}>
                <TRPCReactProvider>
                    <NextIntlClientProvider messages={messages}>
                        <MainProvider>{children}</MainProvider>
                    </NextIntlClientProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
