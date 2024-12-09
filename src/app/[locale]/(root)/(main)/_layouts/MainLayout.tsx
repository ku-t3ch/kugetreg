"use client";

import Footer from '@/app/[locale]/_components/Footer';
import { AppShell, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import AccountNavbarMenu from '../_components/NavbarMenu/AccountNavbarMenu';
import NavbarMenu from '../_components/NavbarMenu/NavbarMenu';
import Logo from '@/app/[locale]/_components/Logo/Logo';
import ChangeLanguage from '@/app/[locale]/_components/ChangeLanguage/ChangeLanguage';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout(props: Props) {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 230,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify='space-between'>
                    <Group>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            size="sm"
                        />
                        <Logo />
                    </Group>
                    <Group>
                        <ChangeLanguage />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section grow my="md" component={ScrollArea}>
                    <NavbarMenu />
                </AppShell.Section>
                <AppShell.Section>
                    <AccountNavbarMenu />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main className="flex flex-col">
                <div className="flex-grow mb-3">{props.children}</div>
                <Footer />
            </AppShell.Main>
        </AppShell>
    );
}
