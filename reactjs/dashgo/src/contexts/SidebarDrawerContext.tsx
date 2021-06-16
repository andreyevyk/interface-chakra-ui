import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext, ReactNode } from "react";

interface SidebarDrawerProviderProps{
   children: ReactNode;
}

type SidebarDraweContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext({} as SidebarDraweContextData);

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps){
   const disclosure = useDisclosure();
   const router = useRouter();

   useEffect(() => {
      disclosure.onClose();
   }, [router.asPath])

   return (
      <SidebarDrawerContext.Provider value={disclosure}>
         {children}
      </SidebarDrawerContext.Provider>
   )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)