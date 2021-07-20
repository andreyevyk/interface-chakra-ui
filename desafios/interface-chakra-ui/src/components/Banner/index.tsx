import {Flex, Image } from '@chakra-ui/react'
import {} from 'next/image'
export function Banner(){
   return(
      <Flex
         position="relative"
         flexDir="column"
         w="100vw"
      >
         <Image src="/images/background.png" alt="background" />
         <Image src="/images/airplane.png" alt="airplane" position="absolute" right="10"/>
      </Flex>
   );
}