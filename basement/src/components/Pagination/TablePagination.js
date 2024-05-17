import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { Flex, HStack, Icon } from '@chakra-ui/react';
import PaginationSelector from './PaginationSelector';

const TablePagination = ({ pageSize, rowsCount, currentPage, setCurrentPage }) => {
  
  const loadPrevious = () => {
    if(currentPage > 1){
      setCurrentPage(prevState => prevState - 1);
    }
  };

  const loadNext = () => {
    if(currentPage < Math.ceil(rowsCount/pageSize)){
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const loadSelected = (pageNubmer) => {
    setCurrentPage(pageNubmer);
  };

  return (
    <HStack display={rowsCount > pageSize ? 'flex' : 'none'}>
      <Flex
        cursor='pointer'
        alignItems='center'
        justifyContent='center'
        onClick={loadPrevious}>
          <Icon as={FaChevronLeft} w='25px' h='30px' color='brand.200'/>
      </Flex>
      <PaginationSelector
        select={loadSelected}
        currentPage={currentPage}
        count={Math.ceil(rowsCount/pageSize)}
      />
      <Flex
        cursor='pointer'
        alignItems='center'
        justifyContent='center'
        onClick={loadNext}>
          <Icon as={FaChevronRight} w='25px' h='30px' color='brand.200'/>
      </Flex>
    </HStack>
  )
}

export default TablePagination;