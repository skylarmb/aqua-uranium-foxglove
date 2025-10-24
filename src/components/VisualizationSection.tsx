import { Box, Center, Grid, Table, Text } from "@chakra-ui/react";
import { useResponses } from "../contexts/ResponsesContext";

const VisualizationSection = () => {
  const { responses } = useResponses(); // TODO memoize responses for large data

  return (
    <Grid templateRows={"100px 1fr 1fr"} gap={2} h={"full"} w={"full"}>
      <Text fontSize={"2xl"} as={"h1"} textAlign={"center"}>
        Data Visualization Section
      </Text>
      <Center borderBottom={"1px solid lightgray"}>Chart Section</Center>
      <Box p={5}>
        {/*from chakra docs */}
        <Table.ScrollArea>
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>Model</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Output</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {responses.map((response) => (
                <Table.Row key={response.id}>
                  <Table.Cell>{response.model}</Table.Cell>
                  <Table.Cell textAlign="end">{response.output}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </Grid>
  );
};

export default VisualizationSection;
