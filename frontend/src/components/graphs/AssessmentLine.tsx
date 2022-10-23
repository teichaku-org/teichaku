// install (please make sure versions match peerDependencies)
import { ResponsiveLine, Serie } from "@nivo/line";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface Props {
  data: Serie[]; // [{ perspectve: 'Math', You: 120, Average:48 }, ...]
}

export const AssessmentLine = ({ data }: Props) => {
  return (
    <ResponsiveLine
      data={data}
      yScale={{ type: "linear", stacked: false, min: -200 }}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      animate={true}
    />
  );
};
