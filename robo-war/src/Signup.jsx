import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  useToast,
  Box,
  Container,
  Flex,
} from "@chakra-ui/react";
import clicksound from "./Sounds/Click-SoundEffect.mp3";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const ding = () => {
    const sound = new Audio(clicksound);
    sound.play();
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!username || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toast({
        title: "Passwords don't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/roboWar', {
        username,
        email,
        password,
      });

      toast({
        title: "Registration successful",
        duration: 5000,
        status: "success",
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <Container>
        <Flex color="white" align="center">
          <Box w="5750px">
            <VStack spacing="5px" color="white">
              <FormControl id="first-name" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                onClick={ding}
                placeholder="Enter your name"
                bg={username ? "gray.50" : "white"}
                color="black"
                _hover={{ borderColor: "black" }}
                borderColor="black"
                onChange={(event) => {
                  setUsername(event.target.value);
          }}
          value={username}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
        onClick={ding}
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
        <Input
           onClick={ding}
          placeholder="Enter your password"
          bg={password ? "gray.50" : "white"}
          color="black"
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
         </FormControl>
         
         <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
          <Input
          onClick={ding}
          placeholder="Enter your password"
          bg={confirmpassword ? "gray.50" : "white"}
          color="black"
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setConfirmpassword(event.target.value);
          }}
          value={confirmpassword}
        />
        </InputGroup>
      </FormControl>
              <Button
                colorScheme="teal"
                size="lg"
                margin="5"
                color="white"
                fontWeight="bold"
                borderRadius="md"
                bgGradient="linear(to-r, teal.500, green.500)"
                _hover={{
                  bgGradient: "linear(to-r, red.500, yellow.500)",
                }}
                style={{ marginTop: 15 }}
                onClick={() => {
                  ding(); // Play sound effect
                  submitHandler(); // Handle form submission
                }}
                isLoading={loading}
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default Signup;
