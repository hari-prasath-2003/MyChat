import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  Flex,
  Group,
  Notification,
  Text,
  TextInput,
} from "@mantine/core";
import { LuPhoneCall, LuPhoneIncoming, LuPhoneOff } from "react-icons/lu";

export default function NotificationCall({ caller, acceptCall, rejectCall }) {
  return (
    <Dialog opened size="lg" radius="md">
      <Text size="sm" mb="xs" fw={500}>
        Incoming Call
      </Text>
      <Flex align={"center"} gap={5} my={5}>
        <Avatar
          src={
            import.meta.env.VITE_API_URL + "/assets/profile/" + caller.profile
          }
        ></Avatar>
        <Text fw={"bold"}>{caller.name}</Text>
      </Flex>
      <Group align="flex-end">
        <Button onClick={close} color="green" rightSection={<LuPhoneCall />}>
          Accept
        </Button>
        <Button onClick={rejectCall} color="red" rightSection={<LuPhoneOff />}>
          Reject
        </Button>
      </Group>
    </Dialog>
  );
}
