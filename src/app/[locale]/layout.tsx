import '@/styles/globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';

type Params = Promise<{ locale: string }>

export default async function RootLayout({
    children,
    params
}: Readonly<{ children: React.ReactNode, params: Params }>) {
    const { locale } = await params

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }
    
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
    );
}
