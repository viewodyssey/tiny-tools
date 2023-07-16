import dynamic from "next/dynamic";

const ResponsiveScatterPlot = dynamic(
  () => import("@nivo/scatterplot").then((m) => m.ResponsiveScatterPlot),
  {
    ssr: false,
  }
);

interface ScatterProps {
  data: any[];
}

const props = {
  margin: { top: 40, right: 20, bottom: 40, left: 60 },
  spacing: 8,
};

const ScatterChart = ({ data }: ScatterProps) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveScatterPlot data={data} {...props} />
    </div>
  );
};

export default ScatterChart;
