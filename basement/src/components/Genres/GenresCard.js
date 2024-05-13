import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box,
  Flex,
  Button,
  Text, 
  Table, 
  Thead,
  Tbody, 
  Th, 
  Tr   
} from '@chakra-ui/react';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import CustomInput from '../Input/CustomInput';
import { Separator } from '../Separator/Separator';
import GenresTablesRow from '../Tables/GenresTablesRow';

const pageSize = 5; 

const GenresCard = () => {
  const [genres, setGenres] = useState([]);

  const { control, handleSubmit } = useForm({
    defaultValues: { genre: '' }
  });

  const onSubmit = async (values) => {
    try { 
      setGenres((prevState) => {
        return prevState.concat(values.genre);
      });
      values.genre = '';
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <Box>
      <Card p='16px' mt='24px'>
        <CardHeader>
          <Flex
            justify='space-between'
            align='center'
            minHeight='60px'
            w='100%'>
            <Text fontSize='lg' color='#fff' fontWeight='bold'>
              Genres
            </Text>
          </Flex>
        </CardHeader>
        <Separator/>
        <CardBody>
          <Flex
            direction='column'
            align='center'
            w='100%'
            justify='center'
            py='1rem'>
              <Box
                w='80%'
              >
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                  <Flex
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    w='100%'
                  >
                    <CustomInput 
                      label={'Genre'} 
                      name={'genre'}
                      control={control}
                      type='text'
                      placeholder='New Genre goes here.'
                      w='100%'
                      h='46px'
                    />
                    <Button
                      variant='brand'
                      fontSize='10px'
                      type='submit'
                      w='100%'
                      maxW='60px'
                      h='46px'
                      ml='65px'
                      >
                        Add
                    </Button>  
                  </Flex>
                </form>
              </Box>

              <Box w='80%'>
                <Table>
                  <Thead>
                    <Tr my='.8rem' ps='0px'>
                      <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                        ID
                      </Th>
                      <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                        NAME
                      </Th>
                      <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                        GAMES
                      </Th>
                      <Th color='gray.400' fontFamily='Plus Jakarta Display' borderBottomColor='#56577A'>
                        REMOVE
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {genres.slice(0,pageSize).map((genre,i) => (
                      <GenresTablesRow 
                        key={i} 
                        id={i+1} 
                        label={genre} 
                        gamesCount={Math.round(Math.random() * 100)}
                        lastItem={i+1===genres.length}  
                      />
                    ))}
                  </Tbody>
                </Table>
              </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  )
}

export default GenresCard;