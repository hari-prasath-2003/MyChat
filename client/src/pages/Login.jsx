import {
  Alert,
  Anchor,
  Button,
  Card,
  Flex,
  Group,
  LoadingOverlay,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

import useApiPost from "../hooks/userApiPost";
import { useEffect, useRef, useState } from "react";
import userStore from "../app/userStore";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const setUser = userStore((state) => state.setUser);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    data,
    loading,
    error: apiError,
    postData,
  } = useApiPost("http://localhost:3000/auth/login");

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
    //this will make post fetch request to the server with the arguements as body
    postData({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
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
              Welcome Back Login to access
            </Text>
            <TextInput
              ref={emailRef}
              label="email"
              type="email"
              placeholder="example@email.com"
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
              <Link
                style={{ textDecoration: "none", color: "gray" }}
                to={"/signup"}
              >
                Dont have an account Signup
              </Link>
              <Button onClick={handleFormSubmit}>Login</Button>
            </Group>
          </Flex>
        </Card>
      </Flex>
    </Paper>
  );
};

export default Login;
