import React, { useState, useEffect } from "react";
import { Header, Segment, Image, Divider } from 'semantic-ui-react'
import APIService from '../../../../services/APIService'
import "./Service.scss";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const { REACT_APP_SERVICES } = process.env;


const Service = React.forwardRef(function Service(props, ref) {

  const[services, setServices] = useState();

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('Usługi');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

  useEffect(() => {
    
  const fetchServices = async() => {
    const services_url = REACT_APP_SERVICES;
    const api_service = new APIService();
    let services = await api_service.receiveData(services_url);
    services.map(service => {
      service.image =  api_service.getBase64Image(service.image, 'svg+xml');
      return service;
    })
    setServices(services)
  }
    fetchServices();
  }, [])

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    }
  };

    return (
        <div ref={ref}>
          <Header style={{marginBottom: '40px', marginTop: '60px'}} color='grey' as='h1'>
          NASZE USŁUGI
          </Header>
              {services ? services.map((service, index) => (
                <div>
                <div key={service.id} className='mobile-service-container'>
                  <Segment className='mobile-service-segment' raised compact>
                  <div style={{height: '50px'}}>
                  </div>
                  <Header style={{color: 'white', textAlign: 'left', height: '58px'}} as='h2'>{service.name}</Header>
                  <Segment style={{height: '140px', overflowY: 'scroll'}}>
                    <p className='service-content'>
                      {service.description}
                    </p>
                  </Segment>
                  <Image className='service-image' src={service.image}></Image>
                </Segment>
              </div>
              {index < services.length -1 ?
              <Divider fitted style={{marginBottom: '10px'}}/> : null}
              </div>
              ))
            : <div></div>}
            </div>
  );
})

export default Service;
