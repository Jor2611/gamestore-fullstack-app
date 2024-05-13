import { useRef } from "react";
import {
  Box,
  Button,
  AlertDialog, 
  AlertDialogBody, 
  AlertDialogContent, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogOverlay 
} from "@chakra-ui/react"

export default function DeleteDialog(props) {
  const cancelRef = useRef();
  const { isOpen, onClose, title, description, action } = props;
  const bg = "linear-gradient(127.09deg, rgba(6, 11, 40, 0.83) 19.41%, rgba(10, 14, 35, 0.83) 76.65%)";

  return (
    <Box>
      <AlertDialog
        isOpen={isOpen}
        motionPreset={'scale'}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent 
            bg={bg} 
            borderRadius="20px" 
            color='#FFF'
            border='1px solid'
            borderColor='gray.600'
          >
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {description}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='secondary' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variant='danger' ml={3} onClick={action}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}