import React from "react";
import { withSVGAnimate } from "./withSVGAnimate";
import { SVGPath } from "@/components/SVGPath/SVGPath";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { PathType } from "@/components/SVGPath/SVGPath";

const mockSVGProps: PathType = {
  color: "red",
  strokeWidth: 3,
  coords: {
    offset: { x: 10, y: 10 },
    multiplier: 1,
    data: [
      [1, 3],
      [2, 5],
      [3, 2],
      [4, 16],
      [18, 5],
    ],
  },
};
/* eslint-disable*/
// @ts-ignore
if (!SVGElement.prototype.getTotalLength) {
  // @ts-ignore
  SVGElement.prototype.getTotalLength = () => 50;
}
/* eslint-enable*/

beforeEach(() => {
  jest.useFakeTimers();
});

const WrappedComponent = withSVGAnimate(SVGPath);

describe("autostop when length over work correctly", () => {
  it("autostop", async () => {
    const onAnimationStateChange = jest.fn();
    act(() => {
      mount(
        <svg>
          <WrappedComponent
            {...mockSVGProps}
            speed={1}
            playState={"running"}
            onAnimationStateChange={onAnimationStateChange}
          />
        </svg>
      );
      jest.advanceTimersByTime(1000);
      expect(onAnimationStateChange).toHaveBeenCalledWith("stopped");
      expect(setInterval).toBeCalled();
    });
  });
});

describe("is animations states works correctly", () => {
  it("when stop case setInterval does not'work", async () => {
    act(() => {
      mount(
        <svg>
          <WrappedComponent {...mockSVGProps} speed={1} playState={"stopped"} />
        </svg>
      );
      jest.advanceTimersByTime(100);
      expect(setInterval).not.toBeCalled();
    });
  });

  it("when pause case setInterval does not'work", async () => {
    act(() => {
      mount(
        <svg>
          <WrappedComponent {...mockSVGProps} speed={1} playState={"paused"} />
        </svg>
      );
      jest.advanceTimersByTime(100);
      expect(setInterval).not.toBeCalled();
    });
  });

  it("when play case setInterval must go on", async () => {
    act(() => {
      mount(
        <svg>
          <WrappedComponent {...mockSVGProps} speed={1} playState={"running"} />
        </svg>
      );
      jest.advanceTimersByTime(100);
      expect(setInterval).toBeCalled();
    });
  });
});
