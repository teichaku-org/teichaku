// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { linearGradientDef } from "@nivo/core";
import { theme } from "./theme";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

interface Props {
  data: BarDatum[]; // [{ perspectve: 'Math', You: 120, Average:48 }, ...]
}
export const AssessmentBar = ({ data }: Props) => {
  return (
    <ResponsiveBar
      theme={theme}
      data={data}
      keys={["reward"]}
      indexBy="date"
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      // 1. defining gradients
      defs={[
        {
          id: "gradientA",
          type: "linearGradient",
          colors: [{ offset: 100, color: "#1971c2", opacity: 0.6 }],
        },
      ]}
      // 2. defining rules to apply those gradients
      fill={[
        // match using object query
        { match: { id: "reward" }, id: "gradientA" },
      ]}
      colors={["white"]}
      borderColor={{
        from: "color",
      }}
      axisTop={null}
      axisRight={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
      }}
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 120,
      //     translateY: 0,
      //     itemsSpacing: 2,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemDirection: "left-to-right",
      //     itemOpacity: 0.85,
      //     symbolSize: 20,
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  );
};
