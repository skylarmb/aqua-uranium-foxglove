import { Provider } from "./components/ui/provider";
import { Button, HStack, Presence, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import UploadSection from "./components/UploadSection";
import VisualizationSection from "./components/VisualizationSection";
import { useResponses } from "./contexts/ResponsesContext";

function App() {
  const { page, setPage, setResponses } = useResponses(); // TODO: move page to its own context
  return (
    <Provider>
      <VStack py={10} gap={4} h={"full"}>
        <Presence present={page === "upload"} w={"full"} h={"full"}>
          <UploadSection />
        </Presence>
        <Presence present={page === "visualization"} w={"full"} h={"full"}>
          <VisualizationSection />
        </Presence>
        <HStack gap={2} pos={"absolute"} top={2} left={2}>
          <Button
            onClick={() => {
              setPage("upload");
              setResponses([]);
            }}
            size={"xs"}
          >
            Reset
          </Button>
        </HStack>

        <ColorModeButton pos={"absolute"} top={4} right={4} />
      </VStack>
    </Provider>
  );
}

export default App;
