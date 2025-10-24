import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

interface Props {
  data: {
    date: string;
    average: number;
    min: number;
    max: number;
    count: number;
  }[];
}

const SimpleChart = ({ data }: Props) => {
  const absMax = data.reduce((max, val) => Math.max(val.max, max), 0);
  return (
    <LineChart
      data={data}
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "40vh",
        aspectRatio: 1.618,
      }}
      responsive
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis
        dataKey="average"
        type="number"
        unit="ms"
        domain={[0, absMax * 1.2]}
      />
      <Line dataKey="average" stroke="blue" type={"monotone"} />
      <Line dataKey="max" stroke="red" type={"monotone"} />
      <Line dataKey="min" stroke="green" type={"monotone"} />
    </LineChart>
  );
};

export default SimpleChart;
