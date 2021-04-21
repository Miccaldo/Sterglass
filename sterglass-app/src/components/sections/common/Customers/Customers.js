import React, { useEffect, useState } from "react";
import { Segment, Image, Header } from 'semantic-ui-react';
import APIService from '../../../../services/APIService'
import Slider from "react-slick";
import './Customers.css';
const { REACT_APP_CUSTOMERS } = process.env;

const Customers = React.forwardRef(function Customers(props, ref) {

  const[customer_logos, setCustomerLogos] = useState()

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('Klienci');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

  const divideLogos = (logos) => {
    let divided = [];
    const count = Math.round(logos.length/2);
    divided.push(logos.slice(0, count));
    divided.push(logos.slice(count, logos.length));
    return divided;
  }

  useEffect(() => {
    const customers_url = REACT_APP_CUSTOMERS;
    const api_service = new APIService();
    const fetchCustomers = async() => {
      let customers = await api_service.receiveData(customers_url);
      customers = customers.map(customer => api_service.getBase64Image(customer.image, 'png'))
      customers = divideLogos(customers);
      setCustomerLogos(customers);
    }
    fetchCustomers();
  }, [])

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: props.slides_to_show,
    slidesToScroll: 1,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: 'linear',
    draggable: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    autoplay: true
  };

  return (
    <div ref={ref} className='customers-container'>
      <Header className='customers-header' as='h2'>
        NASI KLIENCI
      </Header>
      {customer_logos ? 
        customer_logos.map((logos, number) => (
          <div key={number} style={{marginRight: '100px', marginLeft: '100px'}}>
            <Slider {...settings} rtl={number === 0 ? false : true} style={{marginBottom: '15px'}}>
            {logos.map((logo, index) => {
                return (
                  <div key={index} style={{paddingRight: '20px'}}>
                    <Segment className='customers-segment'>
                      <Image className='customers-image' src={logo}></Image>
                    </Segment>
                  </div>)
              })}
            </Slider>
          </div>
        ))
    : <div></div>}  
      <div className='customers-separator'></div>  
    </div>
  );
})

export default Customers;