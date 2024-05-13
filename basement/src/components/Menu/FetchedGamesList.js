import { useEffect, useState } from 'react';
import { 
  Flex, 
  List, 
  ListItem, 
  Avatar, 
  Text 
} from '@chakra-ui/react';


const FetchedGamesList = ({ games, onSelect }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); 

  useEffect(() => {
    onSelect(null);
    setSelectedRowIndex(null);
  },[games]);
  
  const handleSelect = (game, index) => {
    try{
      let rowIndex = null;
      let selectedGame = null;

      if(selectedRowIndex !== index){
        rowIndex = index;
        selectedGame = game;
      }  

      onSelect(selectedGame);
      setSelectedRowIndex(rowIndex);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <List>
      {games.map((game,i) => (
        <ListItem 
          key={i} 
          onClick={() => handleSelect(game,i)}
          _hover={{ bg: "brand.500" }}
          _active={{ bg: "transparent", borderColor: "brand.500" }}
          borderWidth="2px"
          borderRadius="20px"
          borderColor={ selectedRowIndex === i ? 'brand.500' : 'transparent' }
          cursor='pointer'
          p="3px"
        >
          <Flex direction='row' width='100%' my="25px">
            <Avatar
              name={game.name}
              src={game.background_image}
              borderRadius='12px'
              me='16px'
            />
            <Flex flexDirection='column'>
              <Text fontSize='14px' mb='5px' color='#FFF'>
                <Text fontWeight='bold' fontSize='14px' as='span'>
                  {game.name}
                </Text>
                
              </Text>
              <Text fontSize='xs' lineHeight='100%' color='#FFF'>
                {game.released}
              </Text>
            </Flex>
          </Flex>
        </ListItem>
      ))}
    </List>
  )
}

export default FetchedGamesList;