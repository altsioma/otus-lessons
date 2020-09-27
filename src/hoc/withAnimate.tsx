import React, { useEffect, useCallback, useState } from "react";
import { AnimationStateType, AnimationSpeedType } from "../types";

const fps = 60;
let timerId: NodeJS.Timeout;
let i = 0;
let length = 0;

type WithAnimateProps = {
  speed: AnimationSpeedType;
  playState: AnimationStateType;
  onAnimationStateChange: (buttonState: AnimationStateType) => void;
};

export const withAnimate = <Props extends Object>(
  Component: React.ComponentType<Props>
): React.FC<Props & WithAnimateProps> => ({
  playState,
  speed,
  onAnimationStateChange,
  ...props
}) => {
  const [step, setStep] = useState<number>();
  const animateCallback = (node: SVGPathElement) => {
    if (node) {
      const totalLength = Math.ceil(node.getTotalLength());
      const currentStroke = [length++, totalLength].join(" ");

      if (length >= totalLength) {
        onAnimationStateChange("stopped");
      }

      switch (playState) {
        case "running":
          node.style.strokeDasharray = currentStroke;
          break;
        case "paused":
          node.style.strokeDasharray = currentStroke;
          node.style.strokeDashoffset = currentStroke;
          break;
        case "stopped":
          length = 0;
          break;
      }
    }
  };

  const ref = useCallback(animateCallback, [step]);

  useEffect(() => {
    if (playState === "running") {
      timerId = setInterval(() => setStep(i++), 1000 / (fps * speed));
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [playState]);
  return <Component {...(props as Props)} ref={ref} />;
};
