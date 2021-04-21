import React, { useState, useEffect, useRef } from "react";
import { Image, Header, Label, Icon } from "semantic-ui-react";
import APIService from '../../../../services/APIService'
import './Front.css';
import front from '../../../../images/front.png'
const { REACT_APP_HOME, REACT_APP_CONTACT } = process.env;

const Front = React.forwardRef(function Front(props, ref) {

  const container_ref = useRef();

  const[address, setAddress] = useState();
  const[header, setHeader] = useState();

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('Home');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

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
      <div className='front-container' ref={container_ref}>
        <Image className='front-image' src={front}></Image>
        {header ? 
        <div className='front-header-container'>
          <Header as='h1' className='front-header'>{header.header}</Header>
          <p className='front-header-details'>{header.sub_header}</p>
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
  );
})

export default Front;
