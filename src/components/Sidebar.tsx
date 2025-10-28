import { VStack, HStack, Button, List } from "@chakra-ui/react";
import { useResponses } from "../contexts/ResponsesContext";

const Sidebar = () => {
  const { dataSets, setPage, setCurrentDataSetId, currentDataSetId } =
    useResponses();

  return (
    <VStack borderRight={"1px solid #eee"}>
      <List.Root variant={"plain"}>
        {dataSets.length === 0 ? "No data sets" : null}
        {dataSets.map((dataSet) => {
          return (
            <List.Item key={dataSet.id}>
              <Button
                variant={"plain"}
                _hover={{ textDecoration: "underline" }}
                onClick={() => {
                  setCurrentDataSetId(dataSet.id);
                  setPage("visualization");
                }}
              >
                {dataSet.name}
              </Button>
            </List.Item>
          );
        })}
      </List.Root>
      <HStack gap={2}>
        <Button
          onClick={() => {
            setPage("upload");
          }}
          size={"xs"}
        >
          Upload Data
        </Button>
      </HStack>
    </VStack>
  );
};

export default Sidebar;
