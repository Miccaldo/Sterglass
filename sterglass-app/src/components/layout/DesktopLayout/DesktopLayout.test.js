import React from "react";
import { shallow } from "enzyme";
import DesktopLayout from "./DesktopLayout";

describe("DesktopLayout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DesktopLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
