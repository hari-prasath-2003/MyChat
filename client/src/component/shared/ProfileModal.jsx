import { Flex, Image, Modal, Text } from "@mantine/core";

export default function ProfileModal({ user, opened, close }) {
  const profile = user.profile || "default.jpg";
  return (
    <Modal opened={opened} onClose={close} centered title="Profile">
      <Flex h={300} align={"center"} justify={"center"}>
        <Image
          w={"100%"}
          h={"100%"}
          fit={"contain"}
          src={"http://localhost:3000/assets/profile/" + profile}
        ></Image>
      </Flex>
      <Text ta={"center"} tt={"capitalize"} fs={18} fw={"bold"}>
        {user.name}
      </Text>
    </Modal>
  );
}
