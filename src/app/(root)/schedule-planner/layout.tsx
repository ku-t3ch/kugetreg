"use client";
import { useDisclosure } from "@mantine/hooks";
import ScheduleHeader from "./_components/ScheduleHeader/ScheduleHeader";
import { AppShell, Burger, Group, Tabs, UnstyledButton } from "@mantine/core";
import classes from './_css/MobileNavbar.module.css';
import { useState } from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [activeTab, setActiveTab] = useState<string | null>('first');
    return (
        <>
            {children}
        </>

    );
}
