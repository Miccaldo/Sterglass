import React, { useState } from "react";
import MobileBreakpoint from '../../responsive_utilities/MobileBreakpoint'
import Navbar from '../../sections/mobile/Navbar/Navbar'
import Front from '../../sections/mobile/Front/Front'
import AboutUs from '../../sections/mobile/AboutUs/AboutUs'
import Service from '../../sections/mobile/Service/Service'
import Offer from '../../sections/mobile/Offer/Offer'
import Customers from '../../sections/mobile/Customers/Customers'
import Contact from '../../sections/mobile/Contact/Contact'
import Footer from '../../sections/mobile/Footer/Footer'

function MobileLayout(props) {

  const[menu_item, setMenuItem] = useState();

  const handleClick = (menu_item) => {
    setMenuItem({name: menu_item});
  }

  const handleClickForm = () => {
    setMenuItem({name: 'Kontakt'});
  }

  return (
    <MobileBreakpoint>
      <Navbar refs={props.refs} item={menu_item}></Navbar>
      <Front ref={props.refs.home}></Front>
      <AboutUs ref={props.refs.about_us}></AboutUs>
      <Service ref={props.refs.services}></Service>
      <Offer ref={props.refs.offer} onClickForm={handleClickForm}></Offer>
      <Customers  ref={props.refs.customers} slides_to_show={3}></Customers>
      <Contact ref={props.refs.contact}></Contact>
      <Footer refs={props.refs} onClick={handleClick}></Footer>
    </MobileBreakpoint>
  );
}

export default MobileLayout;
