import { useEffect, useState } from 'react';
import { 
  Flex, 
  List, 
  ListItem, 
  Avatar, 
  Text 
} from '@chakra-ui/react';
import { FetchedGameRow } from '../Tables/FetchedGameRow';


const FetchedGamesList = ({ games, isLoading, onSelect }) => {
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
        <FetchedGameRow 
          key={i} 
          name={game.name}
          //Show skeleton only if previously already data loaded
          isLoading={isLoading && games.length}
          released={game.released}
          image={game.background_image}
          isSelected={selectedRowIndex === i}
          handleSelect={() => handleSelect(game,i)}
        />
      ))}
    </List>
  )
}

export default FetchedGamesList;