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
} from "@chakra-ui/react";
import { FaEllipsisVertical, FaPencil, FaTrashCan, FaPhotoFilm } from "react-icons/fa6";
import { adaptToUpdateDate } from "../../utils/dateManager";


function GamesTableRow(props) {
  const {
    logo,
    name,
    publisher,
    platforms,
    genres,
    rating,
    metacritic,
    released,
    updatedAt,
    lastItem,
    deleteDialogHandler
  } = props;

  return (
    <Tr>
      <Td
        minWidth={{ sm: "220px" }}
        ps='0px'
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'>
        <Flex align='center' py='.8rem' minWidth='100%' flexWrap='nowrap'>
          <Avatar
            src={logo}
            w='60px'
            h='60px'
            borderRadius='12px'
            me='18px'
            border='none'
          />
          <Flex direction='column'>
            <Text
              fontSize='sm'
              color='#fff'
              fontWeight='normal'
              minWidth='100%'>
              {name}
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='normal'>
              {publisher}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='120px'>
        <Flex direction='column' flexWrap='nowrap' alignContent={'center'}>
          {[0,1,2].map((_,i) => 
            { return platforms[i] ? (
              <Text key={i} fontSize='sm' color={i === 0 ? '#FFF' : 'gray.400'} fontWeight='normal'>
                {platforms[i].label} {i===2 && '...'}
              </Text>) : null
            }
          )}
        </Flex>
      </Td>

      <Td
        border={lastItem ? "none" : null}
        borderBottomColor='#56577A'
        minW='120px'>
        <Flex direction='column'>
        {[0,1,2].map((_,i) => 
            { return genres[i] ? (
              <Text key={i} fontSize='sm' color={i === 0 ? '#FFF' : 'gray.400'} fontWeight='normal'>
                {genres[i].label}
              </Text>) : null
            }
          )}
        </Flex>
      </Td>

      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Badge
          bg="transparent"
          color= "white"
          fontSize='sm'
          p='3px 10px'
          borderRadius='8px'
          border="1px solid #fff"
          fontWeight='normal'>
          {rating}
        </Badge>
      </Td>

      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Badge
          bg="transparent"
          color= "white"
          fontSize='sm'
          p='3px 10px'
          borderRadius='8px'
          border="1px solid #fff"
          fontWeight='normal'>
          {metacritic}
        </Badge>
      </Td>

      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
          {released}
        </Text>
      </Td>

      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Text fontSize='sm' color='#fff' fontWeight='normal'>
          {adaptToUpdateDate(updatedAt)}
        </Text>
      </Td>

      <Td border={lastItem ? "none" : null} borderBottomColor='#56577A'>
        <Menu>
          <MenuButton>
            <Icon as={FaEllipsisVertical} color='gray.400' cursor='pointer' />   
          </MenuButton>
          <MenuList
            border='transparent'
            backdropFilter='blur(63px)'
            borderRadius='20px'
            bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
          >
            <Flex flexDirection='column'>
              <MenuItem
                  borderRadius='8px'
                  bg='inherit'
                  _hover={{ bg: "brand.400" }}
                  _active={{ bg: "brand.400" }}
                  _focus={{ bg: "brand.400" }}
                > 
                <Flex color='green.500' cursor='pointer' align='center' p='12px'>
                  <Icon as={FaPhotoFilm} me='4px' w='14px' h='14px' />
                  <Text fontSize='xs'>
                    Preview
                  </Text>
                </Flex>   
              </MenuItem>
              <MenuItem
                borderRadius='8px'
                bg='inherit'
                _hover={{ bg: "brand.400" }}
                _active={{ bg: "brand.400" }}
                _focus={{ bg: "brand.400" }}
              >
                <Flex cursor='pointer' align='center' p='12px'>
                  <Icon as={FaPencil} me='4px' w='14px' h='14px' />
                  <Text fontSize='xs' color='gray.400'>
                    Edit
                  </Text>
                </Flex>
              </MenuItem>
              <MenuItem
                borderRadius='8px'
                bg='inherit'
                _hover={{ bg: "brand.400" }}
                _active={{ bg: "brand.400" }}
                _focus={{ bg: "brand.400" }}
                onClick={deleteDialogHandler}
              >
                <Flex color='red.500' cursor='pointer' align='center' p='12px'>
                  <Icon as={FaTrashCan} me='4px' w='14px' h='14px' />
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
