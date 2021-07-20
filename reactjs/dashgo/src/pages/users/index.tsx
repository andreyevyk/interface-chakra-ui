import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { 
   Box, 
   Checkbox, 
   Flex, 
   Heading, 
   Table, 
   Tbody, 
   Td, 
   Text, 
   Th, 
   Thead, 
   Tr, 
   useBreakpointValue, 
   Spinner ,
   Link
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { QueryClient } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";


export default function UserList({users}){
   const [page, setPage] = useState(1);
   const { data, isLoading, isFetching, error } = useUsers(page);

   const isWideVersion = useBreakpointValue({
      base: false,
      lg: true,
   });

   async function handlePrefetchUser(userId: string){
      await queryClient.prefetchQuery(['user', userId], async () => {
         const response = await api.get(`users/${userId}`);
         return response.data
      }, {
         staleTime: 1000 * 60 * 10
      });
   }

   return(
      <Box>
         <Header />
         <Flex w="100%" my="6" maxW={1480} mx="auto" px={["4", "4", "6"]}>
            <Sidebar />

            <Box flex="1" borderRadius={8} bg="gray.800" p="8">
               <Flex mb="8" justifyContent="space-between" align="center">
                  <Heading size="lg" fontWeight="normal">
                     Usuários
                     {isFetching && !isLoading && <Spinner size="sm" color="gray.500" ml="4"/>}
                  </Heading>
                  <NextLink href="/users/create" passHref>
                     <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="pink"
                        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                     >
                        Cria Novo
                     </Button>
                  </NextLink>
               </Flex>

               {isLoading? (
                  <Flex justify="center">
                     <Spinner />
                  </Flex>

               ) : error ? (
                  <Flex justify="center">
                     <Text>Falaha ao obter dados do usuário</Text>
                  </Flex>
               ) : (
               <>
                  <Table colorScheme="whiteAlpha">
                     <Thead>
                        <Th px={["4", "4", "6"]} color="gra.300" width="8">
                           <Checkbox colorScheme="pink" />
                        </Th>
                        <Th>Usuário</Th>
                        {isWideVersion && <Th>Data de Cadastro </Th> }
                        {isWideVersion && <Th w="8"></Th> }
                     </Thead>
                     <Tbody>
                        {data.users.map(user => (
                           <Tr key={user.id}>
                           <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink" />
                           </Td>
                           <Td>
                              <Box>
                                 <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                    <Text fontWeight="bold">{user.name}</Text>
                                 </Link>
                                 <Text fontSize="small" color="gray.300">{user.email}</Text>
                              </Box>
                           </Td>
                           {isWideVersion && <Td> {user.createdAt}</Td> }
                           {isWideVersion && <Td>
                              <Button 
                                 as="a" 
                                 size="sm" 
                                 fontSize="sm" 
                                 colorScheme="purple"
                                 leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                              >
                                 Editar
                              </Button>
                           </Td> }
                        </Tr>
                        ))}
                        
                     </Tbody>
                  </Table> 
                  <Pagination
                     totalCountOfRegisters={data.totalCount}
                     currentPage={page}
                     onPageChange={setPage}
                  />
               </>
               )}

            </Box>
         </Flex>
      </Box>
   );
}

export const getServerSideProps: GetServerSideProps = async () => {
   const { users, totalCount } = await getUsers(1);
   return{
      props: {

      }
   }
}