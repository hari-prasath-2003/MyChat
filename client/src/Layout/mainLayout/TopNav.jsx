import { AppShell, Avatar, Burger, Flex, Text } from "@mantine/core";

import userStore from "../../app/userStore";
import { useDisclosure } from "@mantine/hooks";

import ProfileModal from "../../component/SideNav/ProfileModal";

export default function TopNav({ SideNavOpened, toggle }) {
  const userProfile = userStore((state) => state.userProfile);
  const userName = userStore((state) => state.userName);
  const userId = userStore((state) => state.userId);

  const [opened, { open, close }] = useDisclosure(false);

  function handleProfileClick() {
    open();
  }

  return (
    <AppShell.Header>
      <Flex
        justify={"space-between"}
        direction={"row-reverse"}
        p={"sm"}
        h={"100%"}
      >
        <>
          <Avatar
            src={
              import.meta.env.VITE_API_URL + "/assets/profile/" + userProfile
            }
            onClick={handleProfileClick}
          />
        </>
        <Burger
          opened={SideNavOpened}
          onClick={toggle}
          hiddenFrom="sm"
          size={"sm"}
        />
      </Flex>
      <ProfileModal
        user={{
          profile: userProfile,
          name: userName,
        }}
        opened={opened}
        close={close}
      />
    </AppShell.Header>
  );
}
