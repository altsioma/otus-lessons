import React from "react";
import { SVGPath } from "@/components/SVGPath/SVGPath";
import { AreaType } from "@/types";
import { formatCurrency } from "@/utils/format";

interface IGraphBody {
  area: AreaType;
  xStep?: number;
  yStep?: number;
  length: number;
  labelsRange: Record<"min" | "max", number>;
}
const axisOptions = {
  color: "blue",
  strokeWidth: 2,
};
export class GraphBody extends React.Component<IGraphBody> {
  constructor(props: IGraphBody) {
    super(props);
  }
  offset = 65;
  drawGrid(): React.ReactNode {
    const { area, xStep = this.offset, yStep = 50, labelsRange } = this.props;
    const { min, max } = labelsRange || { min: 0, max: area.height };
    const labelStep = (max - min) / Math.floor(area.height / yStep);
    const grid: JSX.Element[] = [];
    let label = max;
    for (let i = 0; i <= area.height; i = i + yStep) {
      grid.push(
        <React.Fragment key={`height_${i}`}>
          <text fill="blue" x={5} y={i + 15}>
            {formatCurrency(label)}
          </text>
          <SVGPath
            className="horizontal-lines"
            color="grey"
            strokeWidth={1}
            coords={{
              offset: { x: this.offset, y: i },
              multiplier: 1,
              data: [[area.width, i]],
            }}
          />
        </React.Fragment>
      );
      label -= labelStep;
    }
    for (let i = this.offset; i <= area.width; i = i + xStep) {
      grid.push(
        <SVGPath
          className="vertical-lines"
          key={`width_${i}`}
          color="grey"
          strokeWidth={1}
          coords={{
            offset: { x: i, y: 0 },
            multiplier: 1,
            data: [[i, area.height]],
          }}
        />
      );
    }
    return grid;
  }
  render(): React.ReactNode {
    return (
      <svg width={this.props.area.width} height={this.props.area.height}>
        {this.props.children}
        {this.drawGrid()}
        <SVGPath
          {...axisOptions}
          coords={{
            offset: { x: this.offset, y: 0 },
            multiplier: 1,
            data: [[this.offset, this.props.area.height]],
          }}
        />
        {this.props.labelsRange && (
          <text fill="grey" x={5} y={this.props.area.height - 3}>
            {formatCurrency(this.props.labelsRange.min)}
          </text>
        )}
        <SVGPath
          {...axisOptions}
          coords={{
            offset: { x: this.offset, y: this.props.area.height },
            multiplier: 1,
            data: [[this.props.area.width, this.props.area.height]],
          }}
        />
      </svg>
    );
  }
}
