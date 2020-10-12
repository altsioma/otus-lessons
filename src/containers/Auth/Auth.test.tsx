import React from "react";
import { login } from "@/api/auth";
import { mount } from "enzyme";
import { LoginForm } from "./LoginForm";
import { User } from "./User";

const mockHistory = { push: jest.fn() };

jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("@/api/auth", () => ({
  login: jest.fn(),
}));

test("redirects to home page", async () => {
  const name = "Alexander";
  const wrapper = mount(<LoginForm />);
  wrapper.find("input").simulate("change", { target: { value: name } });
  await wrapper.find("form").simulate("submit", { preventDefault: () => null });
  expect(login).toHaveBeenCalledWith(name);
  expect(mockHistory.push).toHaveBeenCalledWith(`/`);
});

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => "Alexander"),
  },
  writable: true,
});

it("is authorized users loading with name", async () => {
  const wrapper = mount(<User />);
  expect(wrapper.find("span").html()).toMatchInlineSnapshot(
    `"<span>Welcome, Alexander </span>"`
  );
});
