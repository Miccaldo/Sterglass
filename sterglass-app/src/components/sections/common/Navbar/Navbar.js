import React, { useEffect, useState } from "react";
import './Navbar.css';
import logo from '../../../../images/sterglass-logo.svg'
import { Menu, Segment, Image } from 'semantic-ui-react';
import scrollToComponent from 'react-scroll-to-component';

function Navbar(props) {

  const menu_items = {home: 'Home', about_us: 'O nas', services: 'Usługi', offer: 'Cennik', customers: 'Klienci', contact: 'Kontakt'};
  const[active_item, setActiveItem] = useState();
  const[scrolling, setScrolling] = useState(false);

  const handleClick = (content, ref, offset=0) => {
    scrollToComponent(ref.current, {
      offset: offset,
      align: 'top',
      duration: 1500
    })
    setTimeout(() => {
      setScrolling(false);
    }, 1500);

    setScrolling(true);
    setActiveItem(content);
  }

  useEffect(() => {
    if(!scrolling){ setActiveItem(props.active_visible); }
  }, [props.active_visible, scrolling])

  useEffect(() => {
    if(props.scroll_to !== undefined){
      switch (props.scroll_to.section) {
        case menu_items.home:
          handleClick(props.scroll_to.section, props.refs.home)
          break;
        case menu_items.about_us:
          handleClick(props.scroll_to.section, props.refs.about_us)
        break;
        case menu_items.services:
          handleClick(props.scroll_to.section, props.refs.services, -50)
        break;
        case menu_items.offer:
          handleClick(props.scroll_to.section, props.refs.offer, 0)
        break;
        case menu_items.customers:
          handleClick(props.scroll_to.section, props.refs.customers)
        break;
        case menu_items.contact:
          handleClick(props.scroll_to.section, props.refs.contact, -50)
        break;
      
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll_to])


  return (
        <Segment className='navbar-container' inverted>
          <Menu className='navbar-menu' inverted pointing secondary>
          <Menu.Item
                  content={menu_items.home}
                  active={active_item === menu_items.home}
                  onClick={(e, { content }) => {handleClick(content, props.refs.home)}}
                />
                <Menu.Item
                  content={menu_items.about_us}
                  active={active_item === menu_items.about_us}
                  onClick={(e, { content }) => {handleClick(content, props.refs.about_us)}}
                />
                <Menu.Item
                  content={menu_items.services}
                  active={active_item === menu_items.services}
                  onClick={(e, { content }) => {handleClick(content, props.refs.services, -50)}}
                />
                <Menu.Item
                  content={menu_items.offer}
                  active={active_item === menu_items.offer}
                  onClick={(e, { content }) => {handleClick(content, props.refs.offer)}}
                />
                <Menu.Item
                  content={menu_items.customers}
                  active={active_item === menu_items.customers}
                  onClick={(e, { content }) => {handleClick(content, props.refs.customers)}}
                />
                <Menu.Item
                  content={menu_items.contact}
                  active={active_item === menu_items.contact}
                  onClick={(e, { content }) => {handleClick(content, props.refs.contact, -50)}}
                />
          </Menu>
          <Image className='navbar-logo' src={logo} style={{height: '78px'}}></Image>
        </Segment>
  );
}

export default Navbar;
