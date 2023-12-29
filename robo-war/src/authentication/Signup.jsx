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
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();

  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = (pics) => {
    setShow(!show);
  };
  const handleConfirmClick = (pics) => {
    setShowconfirm(!showconfirm);
  };

  

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
      });

      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Doesn't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/roboWar/auth",
        { name, email, password },
        config
      );
      console.log(response.data)
      toast({
        title: "Registration successful",
        duration: 5000,
        status: "success",
        isClosable: true,
        position: "top",
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
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
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          bg={name ? "gray.50" : "white"}
          color="black"
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
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
            <Button
              h="1.75em"
              size="md"
              onClick={handleClick}
              color="black"
              variant="ghost"
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showconfirm ? "text" : "password"}
            bg={confirmpassword ? "gray.50" : "white"}
            placeholder="re-enter your password"
            _hover={{ borderColor: "black" }}
            borderColor="black"
            onChange={(event) => {
              setConfirmpassword(event.target.value);
            }}
            value={confirmpassword}
          />
          <InputRightElement w="4.5em">
            <Button
              h="1.75em"
              size="md"
              onClick={handleConfirmClick}
              color="black"
              variant="ghost"
            >
              {showconfirm ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        {" "}
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
