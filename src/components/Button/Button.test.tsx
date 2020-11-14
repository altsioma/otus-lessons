import React from "react";
import { mount, shallow } from "enzyme";
import { Button } from "./Button";
import toJson from "enzyme-to-json";

const onClick = jest.fn();

describe("Button render check", () => {
  const buttonWrapper = shallow(
    <Button color="red" textButton="red" onClick={onClick}></Button>
  );
  it("Default red button render", () => {
    expect(toJson(buttonWrapper.render())).toMatchInlineSnapshot(`
      <button
        class="css-1pnxjnm"
        color="red"
      >
        red
      </button>
    `);
  });
  it("Button on click event work", () => {
    buttonWrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("Button with color parameter 'green' has color 'green'", () => {
    const wrapper = mount(
      <Button
        color="green"
        textButton="green"
        onClick={onClick}
        isActive={true}
      ></Button>
    );
    expect(wrapper.props()).toHaveProperty("color", "green");
  });

  it("Button with textButton parameter 'violet' has text 'violet'", () => {
    const wrapper = mount(
      <Button
        color="violet"
        textButton="violet"
        onClick={onClick}
        isActive={true}
      ></Button>
    );
    expect(wrapper.text()).toEqual("violet");
  });
});
