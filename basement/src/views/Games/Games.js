import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Button,
  Flex,
  Table,
	Thead,
  Tbody,
  Text,
  Th,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import LazyLoad from "../../components/LazyLoader/LazyLoad";
import DeleteDialog from "../../components/Dialogs/DeleteDialog.js";
import GamesTableRow from "../../components/Tables/GamesTablesRow";
import TablePagination from "../../components/Pagination/TablePagination.js";
import { fetchGameRows, deleteGame } from "../../api/gameApi.js";

const PAGE_SIZE=10;

function Games() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);

	const navigate = useNavigate();
  const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();
  console.log("games")

  const { data: games, isLoading, isSuccess } = useQuery({
    queryKey: ["games", currentPage],
    queryFn: () => fetchGameRows(currentPage, PAGE_SIZE),
    keepPreviousData: true
  });

  const navigateToNew = useCallback(() => {
    navigate('/games/new');
  },[]);
  
  const deleteGameHandler = async(id) => {
    try{
      await deleteGame(id);
      closeDeleteDialog();
      setSelectedForDeletion(null);   
    }catch(err){
      console.log(err);
    }
  };

  const deleteDialogHandler = useCallback((game) => {
    try{
      setSelectedForDeletion(game);
      openDeleteDialog();
    }catch(err){
      console.log(err);
    }
  },[]);


  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Card overflowX='hidden' minH='750px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex justifyContent='space-between' alignItems='center' mb='1rem' w='100%'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Games List
            </Text>
            <Button variant='brand' fontSize='10px' fontWeight='bold' p='6px 32px' onClick={() => navigateToNew()}>
              Add New
            </Button>
          </Flex>
        </CardHeader>
        <CardBody overflowX={{ xs:'auto' }}>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px' color='gray.400'>
                <Th ps='0px' color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Name
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Platforms
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Genre
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Rating
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Metacritic
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Released
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Last Update
                </Th>
                <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <LazyLoad delay={1300}>
                {isSuccess && games?.data?.games.map((row, index, arr) =>  (
                  <GamesTableRow
                    key={index}
                    gameData={{
                      id: row.id,
                      name:row.name,
                      logo:row.background_image,
                      publisher:row.publisher,
                      platforms:row.platforms,
                      genres:row.genres,
                      rating:row.rating,
                      metacritic:row.metacritic,
                      released:row.released,
                      updatedAt:row.updatedAt,
                    }}
                    lastItem={index === arr.length - 1}
                    deleteDialogHandler={()=>{ deleteDialogHandler(row) }}
                  />
                ))}
              </LazyLoad>
            </Tbody>
          </Table>
        </CardBody>
        <Flex justifyContent='flex-end' mt='25px' mr={{ sm: '25px', md: '45px'}}>
          <TablePagination pageSize={PAGE_SIZE} rowsCount={games?.data?.count || 0} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </Flex>
      </Card>
      {selectedForDeletion && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          title='Delete Game'
          description={(
            <Text>
              Are you sure you want to delete <Text as='b'>{selectedForDeletion.name}</Text>?
            </Text>
          )}
          action={()=>deleteGameHandler(selectedForDeletion.id)}
        />
      )}
    </Flex>
  );
}

export default Games;
