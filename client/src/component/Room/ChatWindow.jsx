import { Paper, ScrollArea } from "@mantine/core";
import ChatBubble from "./ChatBubble";

export default function ChatWindow({ currentMessage, scrollAreaRef }) {
  return (
    <Paper h={"calc(100% - 100px)"}>
      <ScrollArea h={"100%"} ref={scrollAreaRef} scrollbarSize={1}>
        {currentMessage.map(({ senderId, message, timeStamp }, index) => {
          console.log(senderId);
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
