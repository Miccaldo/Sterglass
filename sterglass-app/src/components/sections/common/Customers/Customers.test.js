import React from "react";
import { shallow } from "enzyme";
import Customers from "./Customers";

describe("Customers", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Customers />);
    expect(wrapper).toMatchSnapshot();
  });
});
