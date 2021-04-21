import React, { useState } from "react";
import DesktopBreakpoint from '../../responsive_utilities/DesktopBreakpoint'
import Navbar from '../../sections/common/Navbar/Navbar'
import Front from '../../sections/common/Front/Front'
import AboutUs from '../../sections/common/AboutUs/AboutUs'
import Service from '../../sections/common/Service/Service'
import Offer from '../../sections/common/Offer/Offer'
import Customers from '../../sections/common/Customers/Customers'
import Contact from '../../sections/common/Contact/Contact'
import Footer from '../../sections/common/Footer/Footer'
import useScrollPosition from '@react-hook/window-scroll' 
import './DesktopLayout.css'

function DesktopLayout(props) {
  const[scroll_to, setScrollTo] = useState();
  const[active_visible, setActiveVisible] = useState();
  const position = useScrollPosition(10);

  const handleClick = (menu_item) => {
    setScrollTo({section: menu_item});
  }

  const handleClickForm = () => {
    setScrollTo('Kontakt');
  }

  const handleVisible = (section) => {
    setActiveVisible(section);
  }

  return (
    <DesktopBreakpoint>
      <Navbar refs={props.refs} scroll_to={scroll_to} active_visible={active_visible}></Navbar>
      <Front ref={props.refs.home} onVisible={handleVisible} scroll={position} correct_offset={-1}></Front>
      <AboutUs ref={props.refs.about_us} onVisible={handleVisible} onVisibleOut={handleVisible} scroll={position} correct_offset={-2}></AboutUs>
      <Service ref={props.refs.services} onVisible={handleVisible} scroll={position} correct_offset={-150}></Service>
      <Offer ref={props.refs.offer} onClickForm={handleClickForm} onVisible={handleVisible} scroll={position} correct_offset={-120}></Offer>
      <Customers  ref={props.refs.customers} slides_to_show={4} onVisible={handleVisible} scroll={position} correct_offset={-150}></Customers>
      <Contact ref={props.refs.contact} onVisible={handleVisible} scroll={position} correct_offset={-145}></Contact>
      <Footer refs={props.refs} onClick={handleClick}></Footer>
    </DesktopBreakpoint>
  );
}

export default DesktopLayout;
