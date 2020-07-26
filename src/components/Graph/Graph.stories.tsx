import React from "react";
import { withKnobs, number, optionsKnob } from "@storybook/addon-knobs";
import { Graph } from "./Graph";
import { ColorSetType } from "../../types";
import { InitialConfig } from "../../data";

export default {
  title: "GraphMakerComponents",
  decorators: [withKnobs],
};

const label = "Colors";
const options: Record<ColorSetType, string> = {
  red: "red",
  green: "green",
  blue: "blue",
  violet: "violet",
};
const defaultValue = "red";

const value = optionsKnob(
  label,
  options,
  defaultValue,
  {
    display: "inline-radio",
  },
  "Colors"
);

const graphGroupId = "Graph Parameters";

export const GraphBody: React.FC<{}> = () => (
  <Graph
    color={value}
    offset={{
      x: number("x", 10, undefined, graphGroupId),
      y: number("y", 10, undefined, graphGroupId),
    }}
    multiplier={number("Multiplier", 5, undefined, graphGroupId)}
    data={InitialConfig.graph}
  />
);