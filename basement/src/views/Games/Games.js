import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Table,
	Thead,
  Tbody,
  Tfoot,
  Text,
  Th,
  Tr,
  useDisclosure
} from "@chakra-ui/react";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import DeleteDialog from "../../components/Dialogs/DeleteDialog.js";
import GamesTableRow from "../../components/Tables/GamesTablesRow";
import TablePagination from "../../components/Pagination/TablePagination.js";
import { GamesContext } from "../../store/GamesContext.js";
import { deleteGame, fetchGameRows } from "../../utils/http.js";

function Games() {
  const pageSize=4;
	const navigate = useNavigate();
  const [rowsCount, setRowsCount]=useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataLoading, setIsDataLoading] = useState(false);  
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);
  const { games, loadGamesData, deleteGameData } = useContext(GamesContext);
  const { isOpen: isDeleteDialogOpen, onOpen: openDeleteDialog, onClose: closeDeleteDialog } = useDisclosure();

  useEffect(() => {
    async function loadData(){
      try{
        setIsDataLoading(true);
        const response = await fetchGameRows(currentPage, pageSize);
        loadGamesData(response.data.games);
        setRowsCount(response.data.count);
      }catch(err){
        console.log(err);
      }finally{
        setIsDataLoading(false);
      }
    }
    loadData();
  },[currentPage]);


  const deleteGameHandler = async(id) => {
    try{
      const response = await deleteGame(id);
      console.log(response);
      deleteGameData(id);
      closeDeleteDialog();
      setSelectedForDeletion(null);
    }catch(err){
      console.log(err);
    }
  }

  const deleteDialogHandler = async(game) => {
    try{
      setSelectedForDeletion(game);
      openDeleteDialog();
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid column={{ xs:1, md:2 }} spacing='24px'>
      <Grid
				templateColumns={{ sm: '1fr', lg: '1.7fr 1.3fr' }}
				maxW={{ sm: '100%', md: '100%' }}
				gap='24px'
				mb='24px'>
				{/* <GenresCard/> */}
			</Grid>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} minH='320px'>
        <CardHeader p='6px 0px 22px 0px'>
          <Flex
            justify='space-between'
            align='center'
            mb='1rem'
            w='100%'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Games List
            </Text>
            <Button
              variant='brand'
              fontSize='10px'
              fontWeight='bold'
              p='6px 32px'
							onClick={() => navigate('/games/new')}
						>
              Add New
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Table variant='simple' color='#fff'>
            <Thead>
              <Tr my='.8rem' ps='0px' color='gray.400'>
                <Th
                  ps='0px'
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Name
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Platforms
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Genre
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Rating
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Metacritic
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Released
                </Th>
                <Th
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Last Update
                </Th>
                <Th 
                  color='gray.400'
                  fontFamily='Plus Jakarta Display'
                  borderBottomColor='#56577A'>
                  Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {games.map((row, index, arr) =>  (
                <GamesTableRow
                  key={index}
                  isLoading={isDataLoading}
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
                  deleteDialogHandler={()=>deleteDialogHandler(row)}
                />
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={8}>
                  <Flex justifyContent='flex-end' mr='45px'>
                    <TablePagination 
                      pageSize={pageSize}
                      rowsCount={rowsCount}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </Flex>
                </Th>
              </Tr> 
            </Tfoot>
          </Table>
        </CardBody>
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
      </SimpleGrid>
    </Flex>
  );
}

export default Games;
