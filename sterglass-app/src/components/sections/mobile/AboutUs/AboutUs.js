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

      if(member.length > 0){
        member[0].image = api_service.getBase64Image(member[0].image); 
        setCompany(company[0])
        setMember(member[0])
      }
    }
    fetchAbout()
  }, [])

  return (
    <div ref={ref} className='about-us-container'>
      <Header className='about-us-header' as='h2'>
        O NAS
      </Header>
        <Container text className='mobile-about-us-content'>
          {company ? 
          <p>
            {company.description}
          </p>
          : <div></div>}
        </Container>
        {member ? 
          <div className='about-us-person-container'>
            <div className='about-us-person-content'>
                <Header className='about-us-person-header'>{member.name}</Header>
                <Divider></Divider>
                <div className='mobile-person-content-inner'>
                  <p style={{textAlign: 'left'}}>
                    {member.description}
                  </p>
                </div>
              
              <div style={{width: '100%', marginTop: '30px', marginBottom: '40px'}}>
                <Image className='mobile-about-us-image' src={member.image}></Image>
              </div>
            </div>
          </div> 
          : null }
    </div>
  ) 
})

export default AboutUs;
