import React from "react";
import { shallow } from "enzyme";
import Copyright from "./Copyright";

describe("Copyright", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Copyright />);
    expect(wrapper).toMatchSnapshot();
  });
});
