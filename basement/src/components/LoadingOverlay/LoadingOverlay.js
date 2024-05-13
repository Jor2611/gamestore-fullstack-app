import { Modal, ModalOverlay, ModalContent, Spinner } from "@chakra-ui/react";

const LoadingOverlay = ({ isOpen }) => {
  return (
    <Modal isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent w="50px" bg="rgba(0, 0, 0, 0)">
        <Spinner size="xl" thickness="5px" color="brand.500" />
      </ModalContent>
    </Modal>
  );
};

export default LoadingOverlay;
