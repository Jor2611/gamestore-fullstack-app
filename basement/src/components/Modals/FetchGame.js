import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Button, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay,
  Flex, 
  Box,
  useToast
} from '@chakra-ui/react';
import { findMatchedGames } from '../../utils/http';
import { Separator } from '../Separator/Separator';
import CustomInput from '../Input/CustomInput';
import FetchedGamesList from '../Menu/FetchedGamesList';


const FetchGame = ({ isOpen, onClose, setFetched }) => {
  const bg = "linear-gradient(127.09deg, rgba(6, 11, 40, 0.83) 19.41%, rgba(10, 14, 35, 0.83) 76.65%)";

  const [fetchedGames, setFetchedGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const toast = useToast();
  const { 
    control, 
    handleSubmit, 
    setValue, 
    formState: { 
      isSubmitting, 
      isDirty 
    }
  } = useForm({ defaultValues: { query: '' } });
  
  const onSubmit = async (data) => {
    try {
      setIsDataLoading(true);
      const result = await findMatchedGames(data.query);
      setFetchedGames(result.slice(0,7));
    } catch (error) {
      console.error('Submission failed', error);
      toast({
        position: 'bottom-left',
        render:() => (
          <Box color='white' p={3} bg='red.500'>
            Issues on API's side, try later again!
          </Box>
        )
      })
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleApply = () => {
    setFetched(selectedGame);
    console.log(selectedGame);
    setFetchedGames([]);
    setSelectedGame(null);
    setValue('query','');
    onClose();
  };

  const handleClose = () => {
    setFetchedGames([])
    setSelectedGame(null);
    setValue('query','');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent 
          bg={bg}
          borderRadius="20px" 
          color='#FFF'
          border='1px solid'
          borderColor={'gray.600'}
        >
          <ModalHeader color={'#FFF'}>SEARCH IN API</ModalHeader>
          <ModalCloseButton color={'#FFF'}/>
          <Separator/>
          <ModalBody>
            <Flex
              direction='column'
              w="100%"
              mt="20px"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                  label={'Game Name'}
                  name={'query'}
                  type='text'
                  control={control}
                  placeholder='Type games name to search...'
                />
                <Button
                  variant='secondary'
                  fontSize='15px'
                  type='submit'
                  w='100%'
                  h='45px'
                  mb='20px'
                  mt='10px'
                  isDisabled={isSubmitting || !isDirty}
                  isLoading={isSubmitting}
                  loadingText='Fetching...'
                  >
                    SEARCH
                </Button>
              </form>
              <Box w="100%">
                <FetchedGamesList 
                  isLoading={isDataLoading}
                  games={fetchedGames} 
                  onSelect={setSelectedGame}
                />
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant='brand' 
              isDisabled={!selectedGame || !fetchedGames.length} 
              onClick={handleApply}
            >
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default FetchGame;