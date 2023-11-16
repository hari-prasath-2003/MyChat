import Lottie from "lottie-react";
import animation from "../assets/home-animation.json";
import { Box, Flex, Text } from "@mantine/core";

const Home = () => {
  return (
    <Flex align={"center"} justify={"center"} direction={"column"}>
      <Box maw={800}>
        <Lottie animationData={animation}></Lottie>
      </Box>
      <Text fw={"bold"} fs={18}>
        Embark on your journey with My Chat - Discover, Connect, Chat!
      </Text>
    </Flex>
  );
};

export default Home;
