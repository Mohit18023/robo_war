import React from 'react'
import { Button} from "@chakra-ui/react";
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
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

// const ding = () => {
//   const sound = new Audio(
//     "https://www.soundjay.com/misc/sounds/small-bell-r.mp3"
//   );
//   sound.play();
// };


export default function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme="teal" variant="solid" width={150} onClick={onOpen}>
        Setting
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Sound</ModalBody>

          <ModalFooter>
            <Slider aria-label="slider-ex-1" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ModalFooter>

          <ModalBody>Music</ModalBody>

          <ModalFooter>
            <Slider aria-label="slider-ex-1" defaultValue={30}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </ModalFooter>
          {/* <ModalFooter>
            <div>
                        <Button colorScheme='blue' mr={3} onClick={ding}>
                          Dark Theme
                        </Button>
                        </div>
                      </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}
