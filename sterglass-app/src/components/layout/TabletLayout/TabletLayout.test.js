import React from "react";
import { shallow } from "enzyme";
import TabletLayout from "./TabletLayout";

describe("TabletLayout", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TabletLayout />);
    expect(wrapper).toMatchSnapshot();
  });
});
