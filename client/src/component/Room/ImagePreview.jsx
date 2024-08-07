import { AspectRatio, Box, Image, Modal } from "@mantine/core";
import { CiPaperplane } from "react-icons/ci";

export default function ImagePreview({ opened, close, fileSrc }) {
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
          <Image h={"calc(100% - 30px)"} src={fileSrc} />
        </AspectRatio>
        <CiPaperplane
          style={{ right: 0, bottom: 0, position: "absolute" }}
          size={25}
        />
      </Box>
    </Modal>
  );
}
