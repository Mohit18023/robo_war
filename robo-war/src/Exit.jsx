import { Button, ButtonGroup } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

const ding=()=>{
  const sound=new Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");
  sound.play();
  }

export default function Exit(){
  const { isOpen, onOpen, onClose } = useDisclosure()
              return (
                <>
                  <Button colorScheme='teal' variant='solid' width={100} onClick={onOpen}>Exit</Button>
            
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Exit</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        Do you want to Exit?
                      </ModalBody>
            
                      <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                          Yes
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={ding}>
                        No
                        </Button>
                      </ModalFooter>
                        </ModalContent>
                  </Modal>
                </>
              )
            
          }