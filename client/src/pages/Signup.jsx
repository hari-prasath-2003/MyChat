import {
  Anchor,
  Avatar,
  Button,
  Card,
  Center,
  Flex,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import useApiPost from "../hooks/userApiPost";
import userStore from "../app/userStore";

const Signup = () => {
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [error, setError] = useState("");
  const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  const {
    data,
    loading,
    error: apiError,
    postData,
  } = useApiPost("http://localhost:3000/auth/signup");

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.success) {
      navigate("/home");
    } else {
      setError(data.message);
    }
  }, [data]);

  function handleFormSubmit() {
    setError("");
    postData({
      name: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profile: profile,
    });
  }

  function handleProfileUpload(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      const fileType = selectedFile.type.replace("image/", "");
      const assetType = "profile";

      reader.onload = async (e) => {
        const { fileName } = await api.upload(
          "http://localhost:3000/user/profile",
          e.target.result,
          fileType,
          assetType
        );
        console.log(fileName);
        setProfile(fileName);
      };

      reader.readAsArrayBuffer(selectedFile);
    }
  }

  return (
    <Paper w={"100vw"} h={"100vh"}>
      <Flex align={"center"} justify={"center"} w={"100%"} h={"100%"}>
        <Card miw={200} maw={"100%"} withBorder shadow="sm">
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <Flex direction={"column"} gap={20} p={20}>
            <Text size="lg" fw={500}>
              Signup - find and chat with friend
            </Text>
            <Center>
              <label>
                <Avatar
                  size={"xl"}
                  src={
                    profile && "http://localhost:3000/assets/profile/" + profile
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileUpload}
                />
                <Text fw={500}>Profile Image</Text>
              </label>
            </Center>
            <TextInput
              ref={userNameRef}
              label="name"
              type="text"
              placeholder="eg : jack paul"
            />
            <TextInput
              ref={emailRef}
              label="email"
              type="email"
              placeholder="eg : example@email.com"
            />
            <PasswordInput
              ref={passwordRef}
              label="Password"
              type="password"
              placeholder="your password"
            />
            <Group style={{ color: "red", textAlign: "center" }}>
              {error && <Text style={{}}>{error}</Text>}
              {apiError && <Text color="red">{apiError}</Text>}
            </Group>
            <Group>
              <Link style={{ textDecoration: "none", color: "gray" }}>
                Dont have an account Signup
              </Link>
              <Button onClick={handleFormSubmit}>Signup</Button>
            </Group>
          </Flex>
        </Card>
      </Flex>
    </Paper>
  );
};

export default Signup;
