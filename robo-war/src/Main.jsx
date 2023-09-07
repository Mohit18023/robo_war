import React from 'react';
import { Container, IconButton, TagRightIcon ,Box } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import Setting from './Setting.jsx'
import Exit from './Exit.jsx'
import { useDisclosure } from '@chakra-ui/react'
// import { handleClick, size } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'


import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

const ding=()=>{
  const sound=new Audio("https://www.soundjay.com/misc/sounds/small-bell-ring-01a.mp3");
  sound.play();
  }


export default function Main(){
  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [placement, setPlacement] = React.useState('left')

  //   return(
  //   <>
  //   <AvatarGroup spacing='1rem' onClick={ding}>
  //         <Avatar bg='teal.500' onClick={onOpen}
  //       >

  //       </Avatar>
          
  //       </AvatarGroup>
      
        
      
  //     <Drawer placement={placement} value='left' onClose={onClose} isOpen={isOpen}>
        
  //       <DrawerOverlay />
  //       <Avatar bg='teal.500' onClick={onOpen}
  //       >

  //       </Avatar>
  //       <DrawerContent>
  //         <DrawerHeader borderBottomWidth='1px'>Meenal</DrawerHeader>
  //         <DrawerBody>
  //           <p>Some contents...</p>
  //           <p>Some contents...</p>
  //           <p>Some contents...</p>
  //         </DrawerBody>
  //       </DrawerContent>
  //     </Drawer>

  //       <BellIcon onClick={ding} >

  //       </BellIcon>
  const { isOpen, onOpen,onClose,onToggle } = useDisclosure()
 

  return (
    <>
    <AvatarGroup spacing='1rem' onClick={ding}>
          <Avatar bg='teal.500' onClick={onToggle}
       >

       </Avatar>
          
        </AvatarGroup>
      {/* <Button onClick={onToggle}>Click Me</Button> */}
      <Collapse in={isOpen} animateOpacity>
        <Box
        margin='0px'
        w='60px'
          p='40px'
          color='white'
          mt='4'
          bg='teal.500'
          rounded='md'
          shadow='md'
        >
         Meenal
        </Box>
      </Collapse>
      <BellIcon></BellIcon>
  
  


        <Container>

<VStack direction='horizontal' spacing={6} align='center' margin={'50'}>
  <Button colorScheme='teal' variant='solid' width={100} onClick={ding}>
    Play
  </Button>
  
  <Setting />
  <Exit />
</VStack>
<Stack direction='row' spacing={4} align='center' margin={'20px'}>
            <Button  colorScheme='red' variant='link' onClick={ding}>
              Share
            </Button>
            <Button colorScheme='blue' variant='outline' onClick={ding}>
              Help
            </Button>
</Stack>


</Container>
        
        
        </>
   ) 
  }
