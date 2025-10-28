import { Provider } from "./components/ui/provider";
import { Button, Grid, HStack, List, Presence, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";
import UploadSection from "./components/UploadSection";
import VisualizationSection from "./components/VisualizationSection";
import { useResponses } from "./contexts/ResponsesContext";

function App() {
  const { page, setPage, setResponses, dataSets } = useResponses(); // TODO: move page to its own context
  return (
    <Provider>
      <Grid templateColumns={"300px 1fr"}>
        <VStack borderRight={"1px solid #eee"}>
          <List.Root as="ul">
            {dataSets.length === 0 ? "No data sets" : null}
            {dataSets.map((dataSet) => {
              return <List.Item key={dataSet.id}>{dataSet.name}</List.Item>;
            })}
          </List.Root>
          <HStack gap={2}>
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
        </VStack>
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
