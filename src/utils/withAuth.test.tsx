import React from "react";
import { withAuth } from "./withAuth";
import { isLoggedIn } from "@/modules/Auth/authApi";
import { mount, ReactWrapper } from "enzyme";
import { sleep } from "@/utils/sleep";
import { act } from "react-dom/test-utils";

jest.mock("@/modules/Auth/authApi", () => ({
  isLoggedIn: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  Redirect: function Redirect(props: Record<string, unknown>) {
    return <div>Redirect: {JSON.stringify(props)}</div>;
  },
}));

describe("withAuth", () => {
  interface ComponentProps {
    name: string;
  }
  const Component: React.FC<ComponentProps> = ({ name }) => <h1>{name}</h1>;
  const WrappedComponent = withAuth(Component);
  let wrapper: ReactWrapper<typeof WrappedComponent>;

  it("renders placeholder during request and component on success", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValueOnce(true);
    act(() => {
      wrapper = mount(<WrappedComponent name="Bob" />);
    });
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div>Checking if user is authorized</div>"`
    );
    await act(async () => {
      await sleep(10);
      wrapper.update();
    });

    expect(wrapper.html()).toMatchInlineSnapshot(`"<h1>Bob</h1>"`);
  });

  it("renders placeholder during request and redirect on failure", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValueOnce(false);
    act(() => {
      wrapper = mount(<WrappedComponent name="Bob" />);
    });
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div>Checking if user is authorized</div>"`
    );
    await act(async () => {
      await sleep(10);
      wrapper.update();
    });
    expect(wrapper.html()).toMatchInlineSnapshot(
      `"<div>Redirect: {\\"to\\":\\"/login\\"}</div>"`
    );
  });
});
