import ScatterChart from "./ScatterChart";

interface UsersChartProps {
  data: any[];
}

const UsersChart = ({ data }: UsersChartProps) => {
  const parseDataToScatterChart = (data: any) => {
    const parsedData = [
      {
        id: "Main",
        data: data.map((d, idx) => {
          return {
            x: idx + 1,
            y: Number(d.users.replaceAll(",", "").replaceAll("+", "")),
          };
        }),
      },
    ];
    return parsedData;
  };
  return (
    <ScatterChart
      data={parseDataToScatterChart(data)}
      chartProps={{
        axisBottom: {
          legend: "Rank",
          legendOffset: 32,
          legendPosition: "middle",
        },
      }}
    />
  );
};

export default UsersChart;
