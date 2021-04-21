import React from "react";
import { shallow } from "enzyme";
import SelectionCustom from "./SelectionCustom";

describe("SelectionCustom", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<SelectionCustom />);
    expect(wrapper).toMatchSnapshot();
  });
});
