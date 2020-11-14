import React from "react";
import { mount } from "enzyme";
import { SettingsFormComponent } from "./SettingsForm";
import { actions } from "./reducer";
import { InitialConfig } from "@/data";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Settings Form", () => {
  const setSettings = jest.fn();
  const changePeriod = jest.spyOn(actions, "changePeriod");
  const changeArea = jest.spyOn(actions, "changeArea");

  const initialSettings = {
    area: {
      width: InitialConfig.area.width,
      height: InitialConfig.area.height,
    },
    currency: InitialConfig.currency,
    color: InitialConfig.color,
    period: {
      from: "2020-11-01",
      to: "2020-11-07",
    },
  };

  const featureSettings = {
    area: { width: 1200, height: 600 },
    period: {
      from: "2020-12-01",
      to: "2020-12-31",
    },
  };

  const formWrapper = mount(
    <SettingsFormComponent
      {...initialSettings}
      changeArea={actions.changeArea}
      changePeriod={actions.changePeriod}
      setSettings={setSettings}
    />
  );

  it("form contains correct initial values", () => {
    expect(formWrapper.find("input[name='period_from']").prop("value")).toBe(
      initialSettings.period.from
    );
    expect(formWrapper.find("input[name='period_to']").prop("value")).toBe(
      initialSettings.period.to
    );
    expect(formWrapper.find("input[name='width']").prop("value")).toBe(
      initialSettings.area.width
    );
    expect(formWrapper.find("input[name='height']").prop("value")).toBe(
      initialSettings.area.height
    );
  });

  it("is change periods inputs form work correctly", async () => {
    await act(async () => {
      formWrapper.find("input[name='period_from']").simulate("change", {
        target: { value: featureSettings.period.from },
      });
      expect(changePeriod).toHaveBeenCalledWith({
        ...initialSettings.period,
        from: featureSettings.period.from,
      });
    });

    await act(async () => {
      formWrapper.find("input[name='period_to']").simulate("change", {
        target: { value: featureSettings.period.to },
      });
      expect(changePeriod).toHaveBeenCalledWith({
        ...initialSettings.period,
        to: featureSettings.period.to,
      });
    });
  });

  it("is change areas inputs form work correctly", async () => {
    await act(async () => {
      formWrapper.find("input[name='height']").simulate("change", {
        target: { value: featureSettings.area.height },
      });
      expect(changeArea).toHaveBeenCalledWith({
        ...initialSettings.area,
        height: featureSettings.area.height,
      });
    });

    await act(async () => {
      formWrapper.find("input[name='width']").simulate("change", {
        target: { value: featureSettings.area.width },
      });
      expect(changeArea).toHaveBeenCalledWith({
        ...initialSettings.area,
        width: featureSettings.area.width,
      });
    });
  });

  it("is on update action work click correctly", async () => {
    await act(async () => {
      formWrapper
        .find("form")
        .simulate("submit", { preventDefault: () => null });
    });
    await act(async () => {
      formWrapper.find("button").simulate("click");
      expect(setSettings).toHaveBeenCalledTimes(1);
    });
  });
});
