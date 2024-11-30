import "@/styles/globals.css";
import { type Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import { Noto_Sans_Thai } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import MainProvider from "./_providers/MainProvider";

export const metadata: Metadata = {
    title: "KU Get Reg: จัดตารางเรียน",
    description:
        "ตรวจสอบตารางเรียน เด็กเกษตรศาสตร์ ทุกวิทยาเขต (บางเขน กำแพงแสน ศรีราชา) จัดตารางเรียน",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSansNoto_Sans_Thai = Noto_Sans_Thai({
    subsets: ["latin", "thai"],
    variable: "--font-sans",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={fontSansNoto_Sans_Thai.className}>
                <TRPCReactProvider>
                    <MainProvider>{children}</MainProvider>
                </TRPCReactProvider>
            </body>
        </html>
    );
}
