import { Text, Paper, Box, Flex, Avatar } from "@mantine/core";

export default function UserInfoCard({
  name,
  lastMessage = "",
  profileImage,
  typing,
  handleUserCardClick,
  handleProfileClick,
}) {
  return (
    <Paper
      p="sm"
      shadow="xs"
      withBorder
      onClick={handleUserCardClick}
      style={{ cursor: "pointer" }}
    >
      <Flex gap={10} align="center">
        <Box>
          <Avatar
            src={
              import.meta.env.VITE_API_URL + "/assets/profile/" + profileImage
            }
            onClick={(e) => {
              e.stopPropagation();
              handleProfileClick();
            }}
          />
        </Box>
        <Flex direction={"column"} justify={"center"}>
          <Text fw={"bolder"}>{name}</Text>
          {typing ? (
            <Text fz={14} lineClamp={1} c={"green"} fw={"bold"}>
              typing...
            </Text>
          ) : (
            <Text fz={14} lineClamp={1}>
              {lastMessage}
            </Text>
          )}
        </Flex>
      </Flex>
    </Paper>
  );
}
