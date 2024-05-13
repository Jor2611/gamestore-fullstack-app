import {
  Tr,
  Td,
  Text,
  Icon,
  Button
} from "@chakra-ui/react";
import { FaTrashCan } from "react-icons/fa6";

function GenresTablesRow(props) {
  const { id, label, gamesCount, lastItem } = props;
  return (
    <Tr>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' minWidth='100%'>
          {id}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {label}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Text fontSize='sm' color='#fff' fontWeight='bold' pb='.5rem'>
          {gamesCount}
        </Text>
      </Td>
      <Td borderBottomColor='#56577A' border={lastItem ? "none" : null}>
        <Button bg='transparent' _hover='none' _active='none'>
          <Icon as={FaTrashCan} color='red.600' cursor='pointer' />
        </Button>
      </Td>
    </Tr>
  );
}

export default GenresTablesRow;
