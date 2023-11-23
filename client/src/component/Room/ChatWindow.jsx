import { Paper, ScrollArea } from "@mantine/core";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ currentMessage, scrollAreaRef }) {
  return (
    <Paper h={"calc(100% - 108px)"}>
      <ScrollArea h={"100%"} ref={scrollAreaRef} scrollbarSize={1}>
        {currentMessage.map(({ senderId, message, timeStamp }, index) => {
          return (
            <ChatBubble
              key={index}
              sender={senderId}
              message={message}
              timeStamp={timeStamp}
            />
          );
        })}
      </ScrollArea>
    </Paper>
  );
}
