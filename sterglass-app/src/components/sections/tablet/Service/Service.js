import React, { useState, useEffect } from "react";
import { Header, Segment, Image, Grid, Container } from 'semantic-ui-react'
import APIService from '../../../../services/APIService'
import "./Service.scss";
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

    return (
      <div ref={ref}>
        <Header style={{marginBottom: '80px', marginTop: '60px'}} color='grey' as='h1'>
          NASZE USŁUGI
        </Header>
        <div className='table-service-outer'>
        {services ? 
            services.map(service => (
                <div className='tablet-service-container'>
                  <Segment className='tablet-service-segment' raised compact>
                    <div style={{height: '50px'}}>
                    </div>
                  <Header style={{color: 'white', textAlign: 'left', height: '58px', fontSize: '18px'}}>{service.name}</Header>
                  <Segment style={{height: '140px', overflowY: 'scroll'}}>
                    <p className='tablet-service-content'>
                      {service.description}
                    </p>
                  </Segment>
                  <Image className='tablet-service-image' src={service.image}></Image>
                </Segment>
              </div>
            ))
        : <div></div>}
        </div>
      </div>

  );
})

export default Service;
