import { Text } from "@chakra-ui/react";
import { Box, Stack } from "@chakra-ui/layout";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
   totalCountOfRegisters: number;
   registerPerPage?: number;
   currentPage?: number;
   onPageChange: (page: number) => void;
}

const siblingCount = 1;

function generatePagesArray(from: number, to:number){
   return [...new Array(to - from)]
      .map((_, index) => {
         return from + index + 1;
      })
      .filter(page => page > 0);
}

export function Pagination({
   totalCountOfRegisters,
   registerPerPage = 10,
   currentPage = 1,
   onPageChange
}: PaginationProps) {
   const lastPage = Math.floor(totalCountOfRegisters / registerPerPage);

   const previousPage = currentPage > 1 
      ? generatePagesArray(currentPage - 1 - siblingCount, currentPage - 1)
      : [];

   const nextPage = currentPage < lastPage
      ? generatePagesArray(currentPage , Math.min(currentPage + siblingCount, lastPage))
      : [];

   return (
      <Stack
         spacing="6"
         mt="8"
         justify="space-between"
         align="center"
         direction={["column", "row"]}
      >
         <Box>
            <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
         </Box>
         <Stack direction="row" spacing="2">
            {currentPage > (1+ siblingCount) && (
               <>
                  <PaginationItem number={1} onPageChange={onPageChange} />
                  {currentPage > (2 + siblingCount) && (
                     <Text color="gray.300" width="8" textAlign="center" >...</Text>
                  )}
               </>
            )}

            {previousPage.length > 0 && previousPage.map(page => (
               <PaginationItem key={page} number={page} onPageChange={onPageChange} />
            ))}
            <PaginationItem number={currentPage} onPageChange={onPageChange} isCurrent />
            {nextPage.length > 0 && nextPage.map(page => (
               <PaginationItem key={page}  number={page} onPageChange={onPageChange} />
            ))}

            {currentPage + siblingCount < lastPage && (
               <>
                  {(currentPage + 1 + siblingCount) < lastPage && (
                     <Text color="gray.300" width="8" textAlign="center" >...</Text>
                  )}
                  <PaginationItem number={lastPage} onPageChange={onPageChange} />
               </>
            )}
         </Stack>
      </Stack>
   );
}