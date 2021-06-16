import Icon from "@chakra-ui/icon";
import { Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/layout";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps{
   icon: ElementType;
   children: string;
   href: string;
}

export function NavLink({icon,href, children, ...rest}: NavLinkProps) {
   return (
      <ActiveLink href={href} passHref>         
         <ChakraLink display="flex" align="self" {...rest}>
            <Icon as={icon} fontSize="20" />
            <Text ml="4" fontWeight="medium">{children}</Text>
         </ChakraLink>
      </ActiveLink>

   )
}