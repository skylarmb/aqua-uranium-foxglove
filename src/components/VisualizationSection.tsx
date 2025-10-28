import { Box, Grid, Table, Text } from "@chakra-ui/react";
import { useResponses } from "../contexts/ResponsesContext";
import SimpleChart from "./SimpleChart";
import type { LLMResponse } from "../types";
import moment from "moment";
import { useMemo } from "react";

// groupByDay function copy pasted from Claude
function groupByDay(data: LLMResponse[]) {
  const grouped = new Map<string, number[]>();

  data.forEach((point) => {
    const dayKey = moment(point.timestamp).startOf("day").format("YYYY-MM-DD");

    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, []);
    }
    grouped.get(dayKey)!.push(point.response_time_ms);
  });

  return Array.from(grouped.entries()).map(([date, values]) => ({
    date,
    average: values.reduce((sum, val) => sum + val, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length,
  }));
}

const VisualizationSection = () => {
  const { currentDataSetId, dataSets } = useResponses(); // TODO memoize responses for large data

  // TODO move current ds selection into context
  const dailyData = useMemo(() => {
    if (currentDataSetId == null) {
      return [];
    }
    const currentDataById = dataSets.find((ds) => ds.id === currentDataSetId);
    if (currentDataById == null) {
      // TODO handle silent failures
      return [];
    }
    return groupByDay(currentDataById.responses);
  }, [currentDataSetId]);

  return (
    <Grid templateRows={"100px 1fr 1fr"} gap={2} h={"full"} w={"full"}>
      {currentDataSetId == null ? (
        <Text fontSize={"xl"} color={"gray"}>
          No dataset selected for visualization
        </Text>
      ) : (
        <>
          <Text
            fontSize={"2xl"}
            as={"h1"}
            textAlign={"center"}
            fontFamily={"monospace"}
          >
            response_time_ms
          </Text>
          <Box borderBottom={"1px solid lightgray"} p={5}>
            <SimpleChart data={dailyData} />
          </Box>
          <Box p={5}>
            {/*from chakra docs */}
            <Table.ScrollArea>
              <Table.Root size="sm" stickyHeader>
                <Table.Header>
                  <Table.Row bg="bg.subtle">
                    <Table.ColumnHeader>Date</Table.ColumnHeader>
                    <Table.ColumnHeader>Min</Table.ColumnHeader>
                    <Table.ColumnHeader>Max</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                      Average
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body fontFamily={"monospace"}>
                  {dailyData.map((day) => (
                    <Table.Row key={day.date}>
                      <Table.Cell>{day.date}</Table.Cell>
                      <Table.Cell>{day.min}</Table.Cell>
                      <Table.Cell>{day.max}</Table.Cell>
                      <Table.Cell textAlign="end">
                        {day.average.toFixed(0)}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Table.ScrollArea>
          </Box>
        </>
      )}
    </Grid>
  );
};

export default VisualizationSection;
