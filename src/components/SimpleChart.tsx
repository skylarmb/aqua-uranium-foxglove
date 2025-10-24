// sample from recharts
import { LineChart, Line } from "recharts";
import type { LLMResponse } from "../types";

interface Props {
  data: LLMResponse[]; // TODO: pass some subset of the data required by the chart
}

const SimpleChart = ({ data }: Props) => (
  <LineChart width={600} height={300} data={data}>
    <Line dataKey="response_time_ms" />
  </LineChart>
);

export default SimpleChart;
