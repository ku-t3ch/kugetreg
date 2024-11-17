import { Text } from "@mantine/core";

export default function Footer() {
  return (
    <Text size="xs" c={"dimmed"}>KU Get Reg - {process.env.NEXT_PUBLIC_BUILD_MESSAGE ?? ""}</Text>
  )
}