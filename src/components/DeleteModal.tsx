import {
  Box,
  Button,
  Grid,
  HStack,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  onConfirmDelete: () => void;
  onCancel: () => void;
  isOpen: boolean;
  children: ReactNode;
}
const DeleteModal = ({
  children,
  onConfirmDelete,
  onCancel,
  isOpen,
}: Props) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <Box
            pos={"fixed"}
            top={0}
            right={0}
            bottom={0}
            left={0}
            zIndex={10}
            bg={"rgba(0,0,0,0.8)"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Grid
              minH={"400px"}
              w={"500px"}
              bg={"white"}
              rounded={"2xl"}
              p={4}
              templateRows={"60px 1fr 60px"}
            >
              <Text fontSize={"2xl"} color={"red"}>
                Are you sure you want to delete?
              </Text>
              <VStack>content</VStack>
              <HStack justifyContent={"center"}>
                <Button colorPalette={"red"} onClick={() => onConfirmDelete()}>
                  Confirm
                </Button>
                <Button
                  variant={"subtle"}
                  onClick={() => {
                    onCancel();
                  }}
                >
                  Cancel
                </Button>
              </HStack>
            </Grid>
          </Box>
        </Portal>
      )}
      {children}
    </>
  );
};

export default DeleteModal;
