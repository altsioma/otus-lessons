import React from "react";
import { InitialConfig } from "../../data";
import { Currency } from "./Currency";
import { Graph } from "../../components/Graph/Graph";
import { getCurrentDate } from "../../utils/date";
import { mount } from "enzyme";
import { responseRUB } from "../../../__mocks__/rates";
import { getCurrency } from "../../services/Currency";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(responseRUB),
  })
);
//** getTotalLength not working in Jest */
if (!SVGElement.prototype.getTotalLength) {
  SVGElement.prototype.getTotalLength = () => 5000;
}

describe("Integration tests cases", () => {
  beforeEach(() => {
    const getCurrency = jest
      .fn()
      .mockImplementation(() => Promise.resolve(responseRUB));
  });

  it("fetch data from API is ok", async () => {
    expect(
      await getCurrency("RUB", {
        from: "2020-07-01",
        to: getCurrentDate(),
      })
    ).toEqual(responseRUB);
  });
  const appComponent = mount(<Currency initial={InitialConfig} />);

  it("first redner and initial state test [constructor and initial state test]", () => {
    expect(
      appComponent
        .findWhere((n) => n.name() === "Button" && n.prop("isActive") === true)
        .text()
    ).toBe("RUB");
    expect(appComponent.find(Graph).prop("data")).toMatchInlineSnapshot(
      `Array []`
    );
  });
  it("first redner and initial state test [componentDidMount]", () => {
    expect(
      appComponent
        .findWhere((n) => n.name() === "Button" && n.prop("isActive") === true)
        .text()
    ).toBe("RUB");
    expect(appComponent.find(Graph).prop("data")).toMatchInlineSnapshot(
      `Array []`
    );
  });
  it("click on button currency change current currency [componentDidUpdate]", () => {
    expect(appComponent.find(Graph).prop("data")).toMatchInlineSnapshot(
      `Array []`
    );
    expect(appComponent.findWhere((n) => n.name() === "Button" && n.prop("isActive") === false).simulate("click"));
    expect(appComponent.find(Graph).prop("data")).toMatchInlineSnapshot(`
      Array [
        Array [
          0,
          300,
        ],
        Array [
          300,
          0,
        ],
      ]
    `);
    expect(
      appComponent
        .findWhere((n) => n.name() === "Button" && n.prop("isActive") === true)
        .text()
    ).toBe("USD");
  });
});
