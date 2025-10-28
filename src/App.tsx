import { Provider } from "./components/ui/provider";
import { Grid, Presence, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import UploadSection from "./components/UploadSection";
import VisualizationSection from "./components/VisualizationSection";
import { useResponses } from "./contexts/ResponsesContext";
import Sidebar from "./components/Sidebar";

function App() {
  const { page } = useResponses(); // TODO: move page to its own context
  return (
    <Provider>
      <Grid templateColumns={"300px 1fr"}>
        <Sidebar />
        <VStack py={10} gap={4} h={"full"}>
          <Presence present={page === "upload"} w={"full"} h={"full"}>
            <UploadSection />
          </Presence>
          <Presence present={page === "visualization"} w={"full"} h={"full"}>
            <VisualizationSection />
          </Presence>

          <ColorModeButton pos={"absolute"} top={4} right={4} />
        </VStack>
      </Grid>
    </Provider>
  );
}

export default App;
