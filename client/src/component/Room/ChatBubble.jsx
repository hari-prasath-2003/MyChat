import { Paper, Flex, Text } from "@mantine/core";
import userStore from "../../app/userStore";

export default function ChatBubble({ sender, message, timeStamp }) {
  const userId = userStore((state) => state.userId);
  const [justify, bg] = sender === userId ? ["end", "blue"] : ["start", "gray"];
  return (
    <Flex justify={justify} m={20}>
      <Paper
        bg={bg}
        maw={300}
        miw={200}
        mih={50}
        py={10}
        px={20}
        radius={"xl"}
        pos={"relative"}
        style={{ color: "white" }}
      >
        <Text>{message}</Text>
        <Text pos={"absolute"} bottom={0} right={10} fz={12}>
          {}
        </Text>
      </Paper>
    </Flex>
  );
}
