import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItemList from "./NavigationItemList";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItemList />", () => {
    it("should render navigation items", () => {
        const wrapper = shallow(<NavigationItemList />);

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it("should render navigation items", () => {
        const wrapper = shallow(<NavigationItemList />);
        wrapper.setProps({ auth: true });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it("should render navigation items", () => {
        const wrapper = shallow(<NavigationItemList />);
        wrapper.setProps({ auth: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>));
    });
});
