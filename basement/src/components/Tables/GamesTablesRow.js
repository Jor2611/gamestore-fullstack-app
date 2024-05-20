import {
  Avatar,
  Badge,
  Flex,
  Menu,
  MenuButton,
  Icon,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { FaEllipsisVertical, FaPencil, FaTrashCan, FaPhotoFilm } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { adaptToUpdateDate } from '../../utils/dateManager';
import GamesTableRowSkeleton from '../Skeletons/GamesTableRowSkeleton';


function GamesTableRow(props) {
  const {
    gameData: {
      id,
      logo,
      name,
      publisher,
      platforms,
      genres,
      rating,
      metacritic,
      released,
      updatedAt,
    },
    isLoading,
    lastItem,
    deleteDialogHandler
  } = props;

  // if(isLoading){
  //   return <GamesTableRowSkeleton lastItem={lastItem}/>
  // }

  const navigate = useNavigate();

  return (
    <Tr>
      <Td
        ps='0px'
        w='330px'
        minW='200px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex 
          py='.8rem'
          minW='100%'
          align='center' 
          flexWrap='nowrap'>          
          <Avatar
            src={logo}
            w='60px'
            h='60px'
            me='18px'
            bg='none'
            border='none'
            borderRadius='12px'
            icon={<Icon color='transparent'/>}
          />

          <Flex direction='column'>
            <Text
              color='#fff'
              minWidth='100%'
              fontSize='sm'
              fontWeight='normal'>
              {name}
            </Text>
            <Text 
              color='gray.400' 
              fontSize='sm' 
              fontWeight='normal'>
              {publisher}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td
        w='180px'
        minW='150px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex direction='column'>
          {[0,1,2].map((_,i) => 
            { return platforms[i] ? (
              <Text 
                key={i} 
                fontSize='sm' 
                fontWeight='normal'
                color={i === 0 ? '#FFF' : 'gray.400'}> 
                {platforms[i].label} {i===2 && '...'}
              </Text>
              ) : null
            }
          )}
        </Flex>
      </Td>

      <Td
        w='160px'
        minW='90px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex direction='column'>
          {[0,1,2].map((_,i) => 
              { return genres[i] ? (
                <Text 
                  key={i} 
                  fontSize='sm' 
                  fontWeight='normal'
                  color={i === 0 ? '#FFF' : 'gray.400'}>
                  {genres[i].label} {i===2 && '...'}
                </Text>
                ) : null
              }
            )}
        </Flex>
      </Td>

      <Td 
        w='100px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex justifyContent='center'>
          <Badge
            p='3px 10px'
            color= '#FFF'
            fontSize='sm'
            fontWeight='normal'
            bg='transparent'
            border='1px solid #fff'
            borderRadius='8px'>
            {rating}
          </Badge>
        </Flex>
      </Td>

      <Td         
        w='130px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex justifyContent='center'>
          <Badge
            p='3px 10px'
            color= '#FFF'
            fontSize='sm'
            fontWeight='normal'
            bg='transparent'
            border='1px solid #fff'
            borderRadius='8px'>
            {metacritic}
          </Badge>
        </Flex>
      </Td>

      <Td 
        w='170px'
        minW='135px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Text
          color='#fff'
          fontSize='sm'
          fontWeight='normal'>
          {released}
        </Text>
      </Td>

      <Td
        w='250px'
        minW='135px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Text
          color='#fff'
          fontSize='sm'
          fontWeight='normal'>
          {adaptToUpdateDate(updatedAt)}
        </Text>
      </Td>

      <Td 
        w='150px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Menu>
          <MenuButton ml='20px'>
            <Icon 
              color='gray.400' 
              cursor='pointer'
              as={FaEllipsisVertical} 
            />   
          </MenuButton>
          <MenuList
            bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
            border='transparent'
            borderRadius='20px'
            backdropFilter='blur(63px)'>

            <Flex flexDirection='column'>
              <MenuItem
                bg='inherit'
                borderRadius='8px'
                _hover={{ bg: 'brand.400' }}
                _focus={{ bg: 'brand.400' }}
                _active={{ bg: 'brand.400' }}> 

                <Flex p='12px' justifyContent='center' color='green.500' cursor='pointer'>
                  <Icon as={FaPhotoFilm} me='4px' w='14px' h='14px' />
                  <Text fontSize='xs'>
                    Preview
                  </Text>
                </Flex>   

              </MenuItem>
              <MenuItem
                bg='inherit'
                borderRadius='8px'
                _hover={{ bg: 'brand.400' }}
                _focus={{ bg: 'brand.400' }}
                _active={{ bg: 'brand.400' }}
                onClick={() => navigate(`${id}/edit`)}>

                <Flex p='12px' align='center' cursor='pointer'>
                  <Icon as={FaPencil} w='14px' h='14px' me='4px'/>
                  <Text fontSize='xs' color='gray.400'>
                    Edit
                  </Text>
                </Flex>

              </MenuItem>
              <MenuItem
                bg='inherit'
                borderRadius='8px'
                _hover={{ bg: 'brand.400' }}
                _focus={{ bg: 'brand.400' }}
                _active={{ bg: 'brand.400' }}
                onClick={deleteDialogHandler}>

                <Flex p='12px' align='center' color='red.500' cursor='pointer'>
                  <Icon as={FaTrashCan} w='14px' h='14px' me='4px'/>
                  <Text fontSize='xs'>
                    Delete
                  </Text>
                </Flex> 
              
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}

export default GamesTableRow;
