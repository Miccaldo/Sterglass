import React, { useState, useEffect } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import APIService from '../../../../services/APIService'
import './Front.css';
import front from '../../../../images/front.png'
const { REACT_APP_HOME, REACT_APP_CONTACT } = process.env;

const Front = React.forwardRef(function Front(props, ref) {

  const[address, setAddress] = useState();
  const[header, setHeader] = useState();

  useEffect(() => {
    const home_url = REACT_APP_HOME;
    const address_url = REACT_APP_CONTACT;
    const api_service = new APIService();
    const fetchHeader = async() => {
      let header = await api_service.receiveData(home_url);
      setHeader(header[0]);
    }
    const fetchAddress = async() => {
      let address = await api_service.receiveData(address_url);
      setAddress(address[0]);
    }
    fetchHeader();
    fetchAddress();
  }, [])

  return (
    <div className='mobile-front-outer'>
      <div className='mobile-front-container'>
        <Image className='mobile-front-image' src={front}></Image>
        {header ? 
        <div className='mobile-front-header-container'>
          <Header as='h3' className='mobile-front-header'>{header.header}</Header>
          <p className='mobile-front-header-details'>{header.sub_header}</p>
          {address ? <Label size='large'>
            <Icon name='phone'></Icon>
              Telefon
            <Label.Detail>
              {address.phone}
            </Label.Detail>
          </Label>
          : <div></div>}
        </div>
        : <div></div>}
      </div>
    </div>
  );
})

export default Front;
