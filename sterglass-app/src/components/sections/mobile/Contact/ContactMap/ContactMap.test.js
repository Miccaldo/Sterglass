import React from "react";
import { shallow } from "enzyme";
import ContactMap from "./ContactMap";

describe("ContactMap", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<ContactMap />);
    expect(wrapper).toMatchSnapshot();
  });
});
