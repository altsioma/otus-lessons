import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { GraphBody } from "./GraphBody";

export default {
  title: "GraphMakerComponents",
  decorators: [withKnobs],
};

export const GraphBodyComponent: React.FC = () => (
  <GraphBody
    area={{ width: 600, height: 300 }}
    labelsRange={{ min: 0, max: 100 }}
    length={20}
  />
);
