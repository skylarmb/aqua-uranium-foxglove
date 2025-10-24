import { Provider } from "./components/ui/provider";
import {
  Box,
  Button,
  Center,
  Grid,
  HStack,
  Presence,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import { useState } from "react";

function App() {
  const [page, setPage] = useState<"upload" | "visualization">("upload");

  return (
    <Provider>
      <VStack py={10} gap={4} h={"full"}>
        <Presence present={page === "upload"}>
          <VStack h={"100vh"} w={"full"} id={"data-upload-section"}>
            <Text fontSize={"2xl"} as={"h1"}>
              Data Upload Section
            </Text>
          </VStack>
        </Presence>
        <Grid templateRows={"100px 1fr 1fr"} gap={2} h={"full"} w={"full"}>
          <Text fontSize={"2xl"} as={"h1"} textAlign={"center"}>
            Data Visualization Section
          </Text>
          <Center borderBottom={"1px solid lightgray"}>Chart Section</Center>
          <Center>Table Section</Center>
        </Grid>
        <HStack gap={2} pos={"absolute"} top={2} left={2}>
          <Button
            onClick={() => {
              setPage("upload");
            }}
            size={"xs"}
          >
            Upload
          </Button>
          <Button
            onClick={() => {
              setPage("visualization");
            }}
            size={"xs"}
          >
            Visualization
          </Button>
        </HStack>

        <ColorModeButton pos={"absolute"} top={4} right={4} />
      </VStack>
    </Provider>
  );
}

export default App;
