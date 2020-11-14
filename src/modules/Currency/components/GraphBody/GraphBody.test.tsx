import React from "react";
import { mount } from "enzyme";
import { GraphBody } from "./GraphBody";

describe("GraphBody renders checks", () => {
  const graphBodyWrapper = mount(
    <svg>
      <GraphBody
        area={{ width: 500, height: 200 }}
        xStep={100}
        yStep={50}
        length={1}
        labelsRange={{ min: 1, max: 10 }}
      />
    </svg>
  );

  it("First and last horiziontal lines grid with y-step=50 for height 200 is correct", () => {
    const lines = graphBodyWrapper.find("path").find(".horizontal-lines");
    expect(lines.at(0).render().attr("d")).toBe(`M 65 0 L 500 0`);
    expect(lines.at(1).render().attr("d")).toBe(`M 65 50 L 500 50`);
    expect(
      lines
        .at(lines.length - 1)
        .render()
        .attr("d")
    ).toBe(`M 65 200 L 500 200`);
  });

  it("First and last vertical lines grid with x-step=100 for width 500 is correct", () => {
    const lines = graphBodyWrapper.find("path").find(".vertical-lines");
    expect(lines.at(0).render().attr("d")).toBe(`M 65 0 L 65 200`);
    expect(lines.at(1).render().attr("d")).toBe(`M 165 0 L 165 200`);
    expect(
      lines
        .at(lines.length - 1)
        .render()
        .attr("d")
    ).toBe(`M 465 0 L 465 200`);
  });
});
