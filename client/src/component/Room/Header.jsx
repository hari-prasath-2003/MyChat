import { Avatar, Flex, Text } from "@mantine/core";

export default function Header({ id, name, profile }) {
  return (
    <Flex align={"center"} gap={5}>
      <Avatar
        src={import.meta.env.VITE_API_URL + "/assets/profile/" + profile}
      />
      <Text fw={"bold"}>{name}</Text>
    </Flex>
  );
}
