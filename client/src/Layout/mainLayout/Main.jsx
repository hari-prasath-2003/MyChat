import { AppShell, Box } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <AppShell.Main>
      <Box h={"calc(100vh - 92px)"} pos={"relative"}>
        <Outlet />
      </Box>
    </AppShell.Main>
  );
}
