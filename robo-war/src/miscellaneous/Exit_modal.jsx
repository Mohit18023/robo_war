import React from 'react'
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom'

// const ding = () => {
//   const sound = new Audio(
//     "https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3"
//   );
//   sound.play();
// };


  export default function Exit() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
      <>
        <Button colorScheme="teal" variant="solid" width={150} onClick={onOpen}>
          Exit
        </Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Do you Want to Exit?</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}></ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  localStorage.removeItem("userInfo");
                  navigate("/auth");
                  window.location.reload();
                }}
              >
                Yes
              </Button>
              <Button onClick={onClose}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
