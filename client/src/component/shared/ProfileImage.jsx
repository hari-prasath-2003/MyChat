import { Avatar } from "@mantine/core";

export default function ProfileImage({ userProfile, handleProfileClick }) {
  console.log({ userProfile });
  return (
    <Avatar
      src={"http://localhost:3000/assets/profile/" + userProfile}
      onClick={handleProfileClick}
    />
  );
}
