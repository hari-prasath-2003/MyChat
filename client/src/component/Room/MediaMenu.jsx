import {
  ActionIcon,
  AspectRatio,
  Box,
  Container,
  Image,
  Menu,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import { CiImageOn, CiPaperplane, CiVideoOn } from "react-icons/ci";
import { FaPaperclip } from "react-icons/fa6";
import VideoPreview from "./VideoPreview";
import ImagePreview from "./ImagePreview";

export default function MediaMenu() {
  const [videoFileSrc, setVideoFileSrc] = useState(null);
  const [imgFileSrc, setImgFileSrc] = useState(null);

  const videoFileInput = useRef(null);
  const imgFileInput = useRef(null);

  const [vidModalOpened, { open: openVidModal, close: closeVidModal }] =
    useDisclosure(false);
  const [imgModalOpened, { open: openImgModal, close: closeImgModal }] =
    useDisclosure(false);

  useEffect(() => {
    if (!vidModalOpened) {
      URL.revokeObjectURL(videoFileSrc);
      setVideoFileSrc(null);
    }
  }, [vidModalOpened, videoFileSrc]);

  useEffect(() => {
    if (!imgModalOpened) {
      URL.revokeObjectURL(imgFileSrc);
      setImgFileSrc(null);
    }
  }, [imgModalOpened, imgFileSrc]);

  function openVideoFP() {
    videoFileInput.current.click();
  }

  function openImageFP() {
    console.log("file preview called");
    imgFileInput.current.click();
  }

  function handleVideoSelect(event) {
    const selectedFile = event.target.files[0];
    const src = URL.createObjectURL(selectedFile);
    setVideoFileSrc(src);
    openVidModal();
  }

  function handleImageSelect(event) {
    const selectedFile = event.target.files[0];
    const src = URL.createObjectURL(selectedFile);
    setImgFileSrc(src);
    openImgModal();
  }

  return (
    <>
      <Menu>
        <Menu.Target>
          <ActionIcon variant="default" h={36}>
            <FaPaperclip />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>Media share</Menu.Label>
          <Menu.Item leftSection={<CiVideoOn />} onClick={openVideoFP}>
            Video
          </Menu.Item>
          <Menu.Item leftSection={<CiImageOn />} onClick={openImageFP}>
            Image
          </Menu.Item>
        </Menu.Dropdown>
        <input
          style={{ display: "none" }}
          type="file"
          accept="video/*"
          ref={videoFileInput}
          onChange={handleVideoSelect}
        />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={imgFileInput}
          onChange={handleImageSelect}
        />
      </Menu>
      <VideoPreview
        opened={vidModalOpened}
        close={closeVidModal}
        fileSrc={videoFileSrc}
      />
      <ImagePreview
        opened={imgModalOpened}
        close={closeImgModal}
        fileSrc={imgFileSrc}
      />
    </>
  );
}
