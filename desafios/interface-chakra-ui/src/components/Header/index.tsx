import { Flex } from '@chakra-ui/react'
import {Logo} from './Logo'
export function Header(){
   return (
      <Flex
        as="header"
        w="100%"
        h="20"
        justify="center"
        align="center"
      >
         <Logo />
      </Flex>
   )
}