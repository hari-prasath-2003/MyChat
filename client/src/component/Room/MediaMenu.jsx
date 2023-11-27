import { ActionIcon, Container, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRef, useState } from "react";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { FaPaperclip } from "react-icons/fa6";

export default function MediaMenu() {
  const imgFilePreview = useRef(null);
  const videoFilePreview = useRef(null);

  const [opened, { open, close }] = useDisclosure(false);

  function openVideoFP() {
    videoFilePreview.current.click();
  }

  function openImageFP() {
    imgFilePreview.current.click();
  }

  function handleVideoSelect() {
    open();
  }

  function handleImageSelect() {}

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
          <Menu.Item leftSection={<CiImageOn />} onclick={openImageFP}>
            Image
          </Menu.Item>
        </Menu.Dropdown>
        <input
          style={{ display: "none" }}
          type="file"
          accept="video/*"
          ref={videoFilePreview}
          onChange={handleVideoSelect}
        />
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          ref={imgFilePreview}
        />
      </Menu>
      <Modal
        opened={opened}
        onClose={close}
        title="Media preview page"
        radius={0}
        centered
        transitionProps={{ transition: "fade", duration: 200 }}
      ></Modal>
    </>
  );
}
