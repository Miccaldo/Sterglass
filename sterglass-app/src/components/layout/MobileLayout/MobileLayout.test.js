import React from "react";
import { shallow } from "enzyme";
import MobileLayout from "./MobileLayout";

describe("MobileLayout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MobileLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
