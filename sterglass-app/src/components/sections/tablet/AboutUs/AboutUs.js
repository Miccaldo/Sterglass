import React, { useState, useEffect } from "react";
import { Image, Header, Grid, Container, Divider } from 'semantic-ui-react';
import APIService from '../../../../services/APIService'
import './AboutUs.css';
const { REACT_APP_COMPANY, REACT_APP_MEMBERS } = process.env;

const AboutUs = React.forwardRef(function AboutUs(props, ref) {

  const[company, setCompany] = useState();
  const[member, setMember] = useState();

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('O nas');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

  useEffect(() => {
    
  const company_url = REACT_APP_COMPANY;
  const member_url = REACT_APP_MEMBERS;
    const api_service = new APIService();
    const fetchAbout = async() => {
      let company = await api_service.receiveData(company_url);
      let member = await api_service.receiveData(member_url);
      member[0].image = api_service.getBase64Image(member[0].image);
  
      setCompany(company[0])
      setMember(member[0])
    }
    fetchAbout()
  }, [])

  return (
    <div ref={ref} className='about-us-container'>
      <Header className='about-us-header' as='h2'>
        O NAS
      </Header>
        <Container text className='about-us-content'>
          {company ? 
          <p>
            {company.description}
          </p>
          : <div></div>}
          
        </Container>
        <div className='about-us-person-container'> 
            {member ? 
            <div style={{display: 'flex'}}>
                <Image className='about-us-image' src={member.image}></Image>
              <Container text className='about-us-person-content'>
                <Header className='about-us-person-header'>{member.name}</Header>
                <Divider></Divider>
                <div className='mobile-person-content-inner'>
                  <p style={{textAlign: 'left'}}>
                    {member.description}
                  </p>
                </div>
              </Container>
              </div>
            : <div></div>}
      </div>
    </div>
  ) 
})

export default AboutUs;
