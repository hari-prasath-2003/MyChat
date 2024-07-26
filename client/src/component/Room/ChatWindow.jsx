import { Center, Paper, ScrollArea, Text, rgba } from "@mantine/core";
import ChatBubble from "./ChatBubble";
import moment from "moment";

export default function ChatWindow({ currentMessage, scrollAreaRef }) {
  let prevMsgDate = moment("01-01-1990");
  function differentDay(prevDate, currentDate) {
    const momentPrevDate = moment(prevDate);
    const momentCurrentdate = moment(currentDate);

    return !momentPrevDate.isSame(momentCurrentdate, "date");
  }

  function formatDate(date) {
    const momentDate = moment(date);
    const momentToday = moment();

    console.log(momentToday.isSame(momentDate));

    const formatedDate = moment(date).format("D MMMM YYYY");

    return momentToday.isSame(momentDate, "date") ? "Today" : formatedDate;
  }

  return (
    <Paper h={"calc(100% - 100px)"} py={10}>
      <ScrollArea h={"100%"} ref={scrollAreaRef} scrollbarSize={1}>
        {currentMessage.map(
          ({ senderId, message, timeStamp, createdAt }, index) => {
            const isNewDay = differentDay(prevMsgDate, createdAt);

            prevMsgDate = isNewDay ? createdAt : prevMsgDate;

            return (
              <>
                {isNewDay && (
                  <Center>
                    <Text
                      bg={rgba("#dadada", 0.7)}
                      p={5}
                      fw={"normal"}
                      fz={14}
                      style={{ borderRadius: 10 }}
                    >
                      {formatDate(createdAt)}
                    </Text>
                  </Center>
                )}
                <ChatBubble
                  key={index}
                  sender={senderId}
                  message={message}
                  timeStamp={timeStamp}
                />
              </>
            );
          }
        )}
      </ScrollArea>
    </Paper>
  );
}
