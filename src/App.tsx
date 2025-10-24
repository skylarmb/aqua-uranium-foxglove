import { Provider } from "./components/ui/provider";
import { Button, HStack, Presence, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import { useState } from "react";
import UploadSection from "./components/UploadSection";
import VisualizationSection from "./components/VisualizationSection";
import { ResponsesContextProvder } from "./contexts/ResponsesContext";

function App() {
  const [page, setPage] = useState<"upload" | "visualization">("upload");

  return (
    <ResponsesContextProvder>
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
    </ResponsesContextProvder>
  );
}

export default App;
