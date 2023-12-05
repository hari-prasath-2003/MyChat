import { AspectRatio, Box, Modal } from "@mantine/core";
import { CiPaperplane } from "react-icons/ci";

export default function VideoPreview({ opened, close, fileSrc }) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Image preview"
      radius={0}
      centered
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <Box pos={"relative"}>
        <AspectRatio ratio={"1/1"}>
          <Box h={"calc(100% - 30px)"}>
            <video
              height={"100%"}
              width={"100%"}
              src={fileSrc}
              controls
              autoPlay
            />
          </Box>
        </AspectRatio>
        <CiPaperplane
          style={{ right: 0, bottom: 0, position: "absolute" }}
          size={25}
        />
      </Box>
    </Modal>
  );
}
