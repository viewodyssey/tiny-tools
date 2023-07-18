import ScatterChart from "./ScatterChart";

interface RatingChartProps {
  data: any[];
}

const RatingChart = ({ data }: RatingChartProps) => {
  const parseDataToScatterChart = (data: any) => {
    const parsedData = [
      {
        id: "Main",
        data: data.map((d, idx) => {
          return {
            x: idx + 1,
            y: d.rating.average,
            // y: d.rating.average * d.rating.count,
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

export default RatingChart;
