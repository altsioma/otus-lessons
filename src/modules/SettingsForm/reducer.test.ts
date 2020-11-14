import { reducer, actions, initialState, SettingsState } from "./reducer";

describe("Test settings reducers", () => {
  it("is set color changed state correcty", () => {
    const expectedState: SettingsState = {
      ...initialState,
      color: "red",
    };
    expect(reducer(initialState, actions.setColor("red"))).toEqual(
      expectedState
    );
  });

  it("is set currency changed state correcty", () => {
    const expectedState: SettingsState = {
      ...initialState,
      currency: "USD",
    };
    expect(reducer(initialState, actions.setCurrency("USD"))).toEqual(
      expectedState
    );
  });

  it("is set periods changed state correcty", () => {
    const featurePeriod = {
      from: "2020-01-01",
      to: "2020-12-31",
    };
    const expectedState: SettingsState = {
      ...initialState,
      period: featurePeriod,
    };
    expect(reducer(initialState, actions.changePeriod(featurePeriod))).toEqual(
      expectedState
    );
  });

  it("is set areas changed state correcty", () => {
    const featureArea = {
      width: 1280,
      height: 1024,
    };
    const expectedState: SettingsState = {
      ...initialState,
      area: featureArea,
    };
    expect(reducer(initialState, actions.changeArea(featureArea))).toEqual(
      expectedState
    );
  });
});
