import React from "react";
import { SVGPath } from "@/components/SVGPath/SVGPath";
import {
  GraphDataType,
  ColorSetType,
  AreaType,
  AnimationStateType,
  AnimationSpeedType,
} from "@/types";
import { withSVGAnimate } from "@/utils/withSVGAnimate";

interface IGraphProps {
  data: GraphDataType;
  area: AreaType;
  color: ColorSetType;
  multiplier?: number;
  speed: AnimationSpeedType;
  playState: AnimationStateType;
  className?: string;
  onAnimationStateChange?: (buttonState: AnimationStateType) => void;
}

export const Graph: React.FC<IGraphProps> = ({ ...props }) => {
  const { multiplier = 1, color } = props;
  const [x, y] = props.data[0];
  const firstGraphPoint = { x, y };
  const AnimateGraph = withSVGAnimate(SVGPath);

  return (
    <AnimateGraph
      className={props.className}
      color={color}
      strokeWidth={3}
      coords={{
        offset: firstGraphPoint,
        multiplier: multiplier,
        data: props.data,
      }}
      speed={props.speed}
      playState={props.playState}
      onAnimationStateChange={props.onAnimationStateChange}
    />
  );
};
