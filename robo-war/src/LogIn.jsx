import React from 'react';
import Signup from'./Signup.jsx'
import Log from'./Log.jsx'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box, Text } from "@chakra-ui/react"
import clicksound from './Sounds/Click-SoundEffect.mp3'

const ding=()=>{
  const sound = new Audio(clicksound);
  sound.play();
  }

export default function Login(){
  return(
    <>
    <Tabs variant='enclosed' align='centre'>
      
    <Container>
    <TabList marginTop={'25'}>
    <ButtonGroup gap='2' margin={'5'}  >
        
        <Tab><Button colorScheme='teal' 
        as='button'
        p={4}
        color='white'
        fontWeight='bold'
        borderRadius='md'
        onClick={ding}
        >Sign Up</Button></Tab>


        
        <Tab><Button colorScheme='teal'
        as='button'
        p={4}
        color='white'
        fontWeight='bold'
        borderRadius='md'
        onClick={ding}
      >Log In</Button></Tab>
      
      </ButtonGroup>
      </TabList>
      </Container>   
      <TabPanels>
        <TabPanel>
        <Signup/>
        </TabPanel>
      <TabPanel>
        <Log/>
      </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
}

