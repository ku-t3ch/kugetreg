"use client";
import { ActionIcon, Button, Menu, rem } from "@mantine/core";
import {
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function AccountNavbarMenu() {
  const { data } = useSession();

  return (
    <div className="border-b border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
          <div className="flex h-full w-full items-center justify-center bg-blue-100">
            <IconUserCircle size={24} className="text-blue-600" />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{data?.user.name}</div>
          <div className="text-xs text-gray-500">{data?.user.email}</div>
        </div>
        <div className="group relative">
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="light">
                <IconChevronRight size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {
                  void signOut();
                }}
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
}
