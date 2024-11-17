"use client";

import { AppShell, Burger, Group, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import NavbarMenu from "../_components/NavbarMenu/NavbarMenu";
import AccountNavbarMenu from "../_components/NavbarMenu/AccountNavbarMenu";
import Footer from "@/app/_components/Footer";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout(props: Props) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const isMobile = useMediaQuery("(max-width: 768px)");
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
        <Group h="100%" px="md">
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
          <span className="text-xl font-bold text-blue-600">
            KU Get Reg {!isMobile && ": จัดตารางเรียน"}
          </span>
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
        <div className="flex-grow">{props.children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
