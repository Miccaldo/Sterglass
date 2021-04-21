import React, { useState, useEffect } from "react";
import Copyright from './Copyright/Copyright'
import { Item, Icon, Header, Image } from "semantic-ui-react";
import logo from '../../../../images/sterglass-logo.svg'
import APIService from '../../../../services/APIService'
import './Footer.css';
const { REACT_APP_CONTACT, REACT_APP_SOCIAL } = process.env;

function Footer(props){

  const[address, setAddress] = useState();
  const[social, setSocial] = useState();


  const addHttps = () => {
    if(!social.facebook.includes('http')){
      social.facebook = 'https://' + social.facebook;
    }
    if(!social.instagram.includes('http')){
      social.instagram = 'https://' + social.instagram;
    }
  }

  useEffect(() => {
    const address_url = REACT_APP_CONTACT;
    const social_url = REACT_APP_SOCIAL;
    const api_service = new APIService();
    const fetchAddress = async() => {
      let address = await api_service.receiveData(address_url);
      setAddress(address[0]);
    }
    const fetchSocial = async() => {
      let social = await api_service.receiveData(social_url);
      setSocial(social[0]);
    }
    fetchAddress();
    fetchSocial();
  }, [])

  const handleClick = (data) => {
    props.onClick(data.target.innerHTML);
  }

  return (
    <div>
      <div className='footer-container'>
        {address ? 
          <div className='mobile-footer-address'>
            <Header as='h4' style={{color: 'white'}}>ADRES</Header>
            <Item.Group className='contact-address'>
              <Item className='footer-address-item'>
                <Item.Header>
                <Icon name='phone'></Icon>
                  {address.phone}
                </Item.Header>
              </Item>
              <Item className='footer-address-item'>
                <Item.Header>
                <Icon name='envelope outline'></Icon>
                  {address.email}
                </Item.Header>
              </Item>
              <Item className='footer-address-item'>
                <Item.Header style={{display: 'flex'}}>
                  <Icon name='location arrow'></Icon>
                  <div>
                    <p className='contact-address-label'>{address.country}</p>
                    <p className='contact-address-label'>{`${address.postal_code} ${address.country}`}</p>
                    <p className='contact-address-label'>{address.email}</p>
                  </div>
                </Item.Header>
              </Item>
            </Item.Group>
        </div>
        : <div></div>}
        <div className='footer-menu'>
          <Header as='h4' style={{color: 'white'}}>MENU</Header>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.home)}}>Home</p>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.about_us)}}>O nas</p>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.services)}}>Usługi</p>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.offer)}}>Cennik</p>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.customers)}}>Klienci</p>
            <p className='footer-menu-item' onClick={(data) => {handleClick(data, props.refs.contact)}}>Kontakt</p>
        </div>
          <div className='footer-icons'>
            <Icon size='big' color='grey' name='facebook' link onClick={() =>{
              if(social.facebook !== ''){
                addHttps();
                window.open(social.facebook)}
              }
            }/>
            <Icon size='big' color='grey' name='instagram' link onClick={() => {
              if(social.instagram !== ''){
                addHttps();
                window.open(social.instagram)}
              }
            }/>
          </div>
        <div className='footer-logo'>
          <Image src={logo} style={{height: '70px'}}></Image>
        </div>
      </div>
      <div className='footer-copyright'>
       <Copyright></Copyright>
      </div>
    </div>
  );
}

export default Footer;
