"use client";
import { Button, Menu, rem, Text } from "@mantine/core";
import MainLayout from "../_layouts/MainLayout";
import { IconDownload, IconFileTypePdf, IconReceipt, IconSettings } from "@tabler/icons-react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Text size="xl" fw={600}>
          ตารางเรียน
        </Text>
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Button leftSection={<IconDownload size={15} />}>Download</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Download Options</Menu.Label>
            <Menu.Item
              leftSection={
                <IconDownload style={{ width: rem(14), height: rem(14) }} />
              }
            >
              PNG
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconFileTypePdf style={{ width: rem(14), height: rem(14) }} />
              }
            >
              PDF
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconReceipt style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Receipt
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      {children}
    </div>
  );
}
