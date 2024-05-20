import { Box, Flex, Text } from '@chakra-ui/react';

const PaginationSelector = ({ count, select, currentPage }) => {

  const PageButton = ({ number, isActive, select }) => (
    <Flex 
      h='40px'
      w='35px'
      justifyContent='center'
      alignItems='center'
      cursor='pointer'
      borderRadius='5px' 
      border='1px solid gray'
      _hover={{ bg: 'brand.600' }}
      bg={isActive && 'brand.200'}        
      onClick={() => select(number)}
    >
      <Text fontSize='medium' color='#FFF'>{number}</Text>
    </Flex>
  )

  const RegularPageSelector = Array
    .from({ length: count })
    .map((_,i) => (
      <PageButton 
        key={i} 
        number={i+1} 
        select={select}
        isActive={i+1===currentPage}
      />
    ));


  const EllipsisPageSelector = (count, currentPage) => {
    if(currentPage < 5){
      return rightSideEllipsis; 
    }else if(count-currentPage < 4){
      return leftSideEllipsis;
    }else{
      return bothSideEllipsis;
    }
  };

  const leftSideEllipsis = Array.from({ length: 7 }).map((_,i)=>{
    let component;
    if(i===0){
      component=<PageButton key={i} number={i+1} select={select}/>
    }else if(i===1){
      component=<Text key={i} color='#FFF'>...</Text>
    }else{
      component=<PageButton key={i} number={count-(7-(i+1))} select={select} isActive={(count-(7-(i+1)))===currentPage}/>
    }
    return component;
  });

  const rightSideEllipsis = Array.from({ length: 7 }).map((_,i)=>{
    let component;
    if(i===6){
      component=<PageButton key={i} number={count} select={select}/>
    }else if(i===5){
      component=<Text key={i} color='#FFF'>...</Text>
    }else{
      component=<PageButton key={i} number={i+1} select={select} isActive={i+1===currentPage}/>
    }
    return component;
  });

  const bothSideEllipsis = Array.from({ length: 7 }).map((_,i)=>{
    let component;
    if(i===0){
      component=<PageButton key={i} number={i+1} select={select}/>;
    }else if(i===1 || i===5){
      component=<Text key={i} color='#FFF'>...</Text>;
    }else if (i===2){
      component=<PageButton key={i} number={currentPage-1} select={select}/>;
    }else if(i===3){
      component=<PageButton key={i} number={currentPage} select={select} isActive={true}/>;
    }else if(i===4){
      component=<PageButton key={i} number={currentPage+1} select={select}/>;
    }else if(i===6){
      component=<PageButton key={i} number={count} select={select}/>;
    }else{
      component=null;
    }
    return component;
  });

  return count > 7
    ? EllipsisPageSelector(count, currentPage)
    : RegularPageSelector;
}

export default PaginationSelector;