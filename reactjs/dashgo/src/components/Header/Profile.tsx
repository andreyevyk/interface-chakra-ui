import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";

interface ProfileProps {
   showProfileData: boolean;
}

export function Profile({showProfileData = true}: ProfileProps){
   return (
      <Flex align="center">
         {showProfileData &&  (
            <Box mr="4" textAlign="right">
               <Text>Andrey Evyk</Text>
               <Text color="gray.300" fontSize="small">
                  andreyevyk13@gmail.com
               </Text>
            </Box>
         )}
         <Avatar size="md" name="Andrey Evyk" src="https://github.com/andreyevyk.png" />
      </Flex>
   )
}