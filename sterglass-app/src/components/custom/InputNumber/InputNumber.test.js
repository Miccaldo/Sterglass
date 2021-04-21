import React from "react";
import { shallow } from "enzyme";
import InputNumber from "./InputNumber";

describe("InputNumber", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<InputNumber />);
    expect(wrapper).toMatchSnapshot();
  });
});
