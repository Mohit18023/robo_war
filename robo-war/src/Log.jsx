import React, { useState } from 'react';
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import clicksound from './Sounds/Click-SoundEffect.mp3';

  

  const ding=(e)=>{
    const sound=new Audio(clicksound);
    sound.play();
   }

  export default function Log(){
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [username, setUserame] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    

    const submitHandler = async () => {
      setLoading(true);
      if (!username || !password) {
        toast({
          title: 'Please fill all the fields',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
        return;
      }
    
      try {
        const response = await axios.post('/roboWar', {
          username,
          password,
        });
    
        toast({
          title: 'Login Successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
    

      localStorage.setItem('userInfo', JSON.stringify(response.data));
      } catch (err) {
        toast({
          title: 'Error Occurred!',
          description: err.response ? err.response.data.message : 'Unknown error',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      }
    
      setLoading(false);
    };
    

    return(
        <>
        <Container>
        <Flex color='white'>
        <Box w='5750px'>
          
        <FormControl isRequired>
            <FormLabel>Username</FormLabel>
        <Input
        onClick={ding}
          placeholder="Enter your name"
          bg={username ? "gray.50" : "white"}
          color="black"
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setUserame(event.target.value);
          }}
          value={username}
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
        
        </Box>
        </Flex>
        
        <Button
        colorScheme="teal"
        size="lg"
        margin={'5'}
        color="white"
        fontWeight="bold"
        borderRadius="md"
        bgGradient="linear(to-r, teal.500, green.500)"
        _hover={{
          bgGradient: 'linear(to-r, red.500, yellow.500)',
        }}
        style={{ marginTop: 15 }}
        onClick={() => {
          ding(); // Play sound effect
          submitHandler(); // Handle form submission
        }}
        isLoading={loading}
        >
          Login
        </Button>


        <Stack direction='row' spacing={4} align='center' margin={'20px'}>
            <Button fontWeight={'bold'} colorScheme='red' variant='link' onClick={ding}>
      Forgot Password?
            </Button>
            <Button fontWeight={'bold'} colorScheme='blue' variant='outline' onClick={ding}>
              Help
            </Button>
        </Stack>
        </Container>
        </>
        )
    };

