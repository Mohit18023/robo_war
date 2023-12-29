import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { Grid, Spacer } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  EditIcon,
  EmailIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { Switch } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import Settings from "../miscellaneous/Settings";
import Exit from "../miscellaneous/Exit_modal";
import Home from "../Images/Home.jpg";

function HomePage() {
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // const handleLogout = () => {
  //   localStorage.removeItem("userInfo");
  //   window.location.reload();
  // };
  const joinRoom = () => {
    const socket = io("http://localhost:5000");
    socket.emit("join_room", { username: user.name, room: "room1" });
  };

  const navigateToPlay = () =>{
    navigate('/game');
  }

  const ding = () => {
    const sound = new Audio(
      "https://pixabay.com/music/electro-cyber-war-126419/"
    );
    sound.play();
  };

  const playGame = () => {
    joinRoom();
    navigate("/game");
  };


  return (
      <div
        className="image"
        style={{
          height: "100vh",
          width: "100vw",
          backgroundImage: `url(${Home})`,
          //  backgroundImage:
          // 'url("https://th.bing.com/th/id/OIP.gXZ69lTKaHxWM4frZDPtAQHaEK?w=276&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")',
          // backgroundImage: 'url("https://www.freepik.com/premium-photo/abstract-architectural-concrete-smooth-interior-minimalist-house-with-color-gradient-neon_42257376.htm#query=dark%20theme%20playground%20background&position=30&from_view=search&track=ais")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
           color: "black",
        }}
      >
        <Grid margin={4} h={0} w={10}>
          <Menu>
            <MenuButton
              as={IconButton}
              textAlign={['left', 'center']}
              px={6}
              py={6}
              bg={"teal"}
              transition="all 0.2s"
              borderRadius="lg"
              borderWidth="1px"
              _hover={{ bg: "teal.400" }}
              _expanded={{ bg: "teal.400" }}
              _focus={{ boxShadow: "outline" }}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <AvatarGroup spacing="1rem" onClick={ding} >
                  <Avatar bg="teal.500" ></Avatar>
                </AvatarGroup>
              </MenuItem>
              <MenuItem>
                {user.name}
                <Spacer />
                <EditIcon />
              </MenuItem>
              <MenuItem>
                {user.email}
                <Spacer />
                <EmailIcon />
              </MenuItem>
              <MenuItem>
                Account Settings <Spacer />
                <SettingsIcon />
              </MenuItem>
              <MenuItem>
                Notification
                <Spacer />
                <Switch id="Notifications?" />
              </MenuItem>
              {/* <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem> */}

              <MenuItem></MenuItem>
              <MenuItem>
                About Us
                <Spacer />
                <ChevronRightIcon />
              </MenuItem>
            </MenuList>
          </Menu>
        </Grid>

        <Container textAlign={"center"}>
          <Text fontSize="6xl" fontWeight="medium" color="blueviolet" marginTop={20} marginBottom={10}>
            Main Menu
          </Text>
          {/* <Text
      fontSize="2xl"
      fontWeight="bold"
    >A Multiplayer Game
  </Text> */}
        </Container>

        <VStack>
          <Button
            colorScheme="teal"
            variant="solid"
            width={150}
            onClick={() => {
              ding(); // Play sound effect
              navigateToPlay(); // Handle form submission
            }}
            // onClick={ding}
            // onClick={navigateToPlay}
          >
            Play
          </Button>
          {/* <Playground/> */}
          <Settings />
          <Exit />
        </VStack>
      </div>
  );
}

export default HomePage;
