import React, { useEffect, useRef, useState } from "react";
import './Navbar.css';
import logo from '../../../../images/sterglass-logo.svg'
import { Menu, Segment, Image, Button, Icon } from 'semantic-ui-react';
import { CSSTransition } from 'react-transition-group';
import { useSwipeable,  } from 'react-swipeable'
import scrollToComponent from 'react-scroll-to-component';

function Navbar(props) {

  const menu_ref = useRef();
  const swipe_ref = useRef();

  const menu_items = {home: 'Home', about_us: 'O nas', services: 'Usługi', offer: 'Cennik', customers: 'Klienci', contact: 'Kontakt'};

  const refPassthrough = (el) => {
    swipe_handlers.ref(el);
    swipe_ref.current = el;
  }

  const handleClick = (content, ref, offset=0) => {
    scrollToComponent(ref.current, {
      offset: offset,
      align: 'top',
      duration: 1500
    })
    setActiveItem(content);
  }

  const handleHamburger = () => {
    setShow(!show)
  }

  const swipe_handlers = useSwipeable({
    onSwipedLeft: (eventData) => setShow(true),
    onSwipedRight: (eventData) => setShow(false)
  });

  const[active_item, setActiveItem] = useState();
  const [show, setShow] = useState(false)

  useEffect(() => {
    if(props.item !== undefined){
      setActiveItem(props.item);
      switch (props.item.name) {
        case menu_items.home:
          handleClick(props.item.name, props.refs.home)
          break;
        case menu_items.about_us:
          handleClick(props.item.name, props.refs.about_us)
        break;
        case menu_items.services:
          handleClick(props.item.name, props.refs.services, -60)
        break;
        case menu_items.offer:
          handleClick(props.item.name, props.refs.offer, 0)
        break;
        case menu_items.customers:
          handleClick(props.item.name, props.refs.customers)
        break;
        case menu_items.contact:
          handleClick(props.item.name, props.refs.contact, -50)
        break;
      
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.item, props.refs.home, props.refs.about_us, props.refs.services,
      props.refs.offer, props.refs.customers, props.refs.contact])

  return (
        <div className='mobile-navbar-outer'>
          <Segment className='mobile-navbar-container' inverted>
            <Button className='mobile-navbar-button' icon color='blue' onClick={handleHamburger}>
              <Icon name='bars' size='big'></Icon>
            </Button>
            <Image className='mobile-navbar-logo' src={logo} style={{height: '78px'}}></Image>
          </Segment>
          <div className='mobile-menu-container' {...swipe_handlers} ref={refPassthrough}>
          <CSSTransition in={show} timeout={500} classNames="my-node">
              <Menu className='mobile-navbar-menu' inverted vertical ref={menu_ref}>
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
                  onClick={(e, { content }) => {handleClick(content, props.refs.customers, 0)}}
                />
                <Menu.Item
                  content={menu_items.contact}
                  active={active_item === menu_items.contact}
                  onClick={(e, { content }) => {handleClick(content, props.refs.contact, -50)}}
                />
              </Menu>
            </CSSTransition>
            </div>
        </div>
  );
}

export default Navbar;
