import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/robowar/auth/login",
        { email, password },
        config
      );
      console.log(response.data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setLoading(false);
      navigate("/home");
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      navigate("/auth");
    }
  };
  return (
    <VStack spacing={5}>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter your email"
          bg={email ? "gray.50" : "white"}
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            bg={password ? "gray.50" : "white"}
            placeholder="Enter your password"
            _hover={{ borderColor: "black" }}
            borderColor="black"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <InputRightElement w="4.5em">
            <Button h="1.75em" size="sm" onClick={handleClick} color="black">
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        width="100%"
        colorScheme="green"
        style={{ marginTop: 10 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

    </VStack>
  );
}
