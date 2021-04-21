import React, { useEffect, useState, useRef } from "react";
import { Form, Segment, Header, Grid, Label, Icon, Divider, Item, Popup } from 'semantic-ui-react';
import InputNumber from '../../../custom/InputNumber/InputNumber'
import ReCAPTCHA from "react-google-recaptcha";
import ContactMap from './ContactMap/ContactMap'
import APIService from '../../../../services/APIService'
import './Contact.css';
const { REACT_APP_CONTACT, REACT_APP_FORM } = process.env;

const Contact = React.forwardRef(function Contact(props, ref) {

  const form_url = REACT_APP_FORM;
  const api_service = new APIService();
  const[address, setAddress] = useState();
  const[recaptcha, setRecaptcha] = useState(false);
  const [required_fields, setRequiredFields] = useState({name: false, surname: false, phone: false, email: false});
  const[send_popup, setSendPopup] = useState(false);
  const recaptcha_ref = useRef()
  const[form_json, setFormJson] = useState({});

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('Kontakt');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

  const callback = () => {
    setRecaptcha(true);
  }

  const handleClick = () => {

    let send = true;
    let error_counter = 0;

    Object.keys(required_fields).forEach((required) => {
      if(form_json[required] === undefined || form_json[required] === ''){ 
        send = false;
        if(error_counter < 1){
            required_fields[required] = true;
            setTimeout(() => {
              required_fields[required] = false;
              setRequiredFields({...required_fields});
            }, 2500);     
        }
        error_counter += 1;
        }
    })
    if(send){
      if(recaptcha){
        recaptcha_ref.current.reset();
        setSendPopup(true);
        setTimeout(() => {
          setSendPopup(false);
        }, 2500);
        api_service.sendData(form_url, form_json);
      }
    }else{
      setRequiredFields({...required_fields});
    }
  }

  const handleChange = (text, key) => {
    required_fields[key] = false;
    setFormJson({...form_json, [key]: text});
    setRequiredFields({...required_fields});
  }

  const handleChangeNumber = (value, key) => {
    setFormJson({...form_json, [key]: value});
  }

  useEffect(() => {
    const address_url = REACT_APP_CONTACT;
    const api_service = new APIService();
    const fetchAddress = async() => {
      let address = await api_service.receiveData(address_url);
      setAddress(address[0]);
    }
    fetchAddress();
  }, [])

  return (
    <div ref={ref} style={{marginBottom: '50px'}} className='mobile-contact-outer'>
       <Header style={{marginBottom: '30px', marginTop: '50px'}} color='grey' as='h2'>
        KONTAKT
      </Header>
      {address ? 
      <div style={{textAlign: 'left', display: 'flex', padding: '10px', justifyContent: 'center'}}>
        <Segment style={{width: '95%', marginBottom: '25px', maxWidth: '400px'}} compact>
          <Header as='h4'>{address.name.toUpperCase()}</Header>
          <Divider></Divider>
          <Item.Group className='contact-address'>
            <Item className='contact-item'>
              <Item.Header>
              <Icon name='phone'></Icon>
                {address.phone}
              </Item.Header>
            </Item>
            <Item className='contact-item'>
              <Item.Header>
              <Icon name='envelope outline'></Icon>
                {address.email}
              </Item.Header>
            </Item>
            <Item className='contact-item'>
              <Item.Header style={{display: 'flex'}}>
              <Icon name='location arrow'></Icon>
                <div>
                  <p className='contact-address-label'>{address.country}</p>
                  <p className='contact-address-label'>{`${address.postal_code} ${address.country}`}</p>
                  <p className='contact-address-label'>{address.street}</p>
                </div>
              </Item.Header>
            </Item>
          </Item.Group>
          <Label>
            NIP
            <Label.Detail>{address.NIP}</Label.Detail>
          </Label>
          <Label>
            REGON
            <Label.Detail>{address.REGON}</Label.Detail>
          </Label>
        </Segment>
      </div>
    : null}

    <div style={{display: 'flex', padding: '10px', justifyContent: 'center'}}>
      <ContactMap></ContactMap>
    </div>

      <div className='mobile-contact-container'>
        <Segment className='mobile-contact-segment'>
          <Header block>Formularz kontaktowy</Header>
          <Grid columns={2}>
            <Grid.Row className='mobile-contact-row'>
              <Grid.Column>
                <CustomInput error={required_fields.name} label={<p className='contact-label'>Imię *</p>} placeholder='Imię' onChange={(e, {value}) => { handleChange(value, 'name')}}/>
              </Grid.Column>
              <Grid.Column>
                <CustomInput error={required_fields.surname} label={<p className='contact-label'>Nazwisko *</p>} placeholder='Nazwisko' onChange={(e, {value}) => { handleChange(value, 'surname')}}/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className='mobile-contact-row'>
              <Grid.Column>
                <InputPhone error={required_fields.phone} label={<p className='contact-label'>Telefon *</p>} placeholder='Telefon' onChange={value => { handleChange(value, 'phone')}}></InputPhone>
              </Grid.Column>
              <Grid.Column>
              <CustomInput error={required_fields.email} label={<p className='contact-label'>Email *</p>} placeholder='Email' onChange={(e, {value}) => { handleChange(value, 'email')}}></CustomInput>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className='mobile-contact-row'>
              <Grid.Column>
                <Form.Input fluid label={<p className='contact-label'>Firma</p>} placeholder='Firma' onChange={(e, {value}) => { handleChange(value, 'company')}}/>
              </Grid.Column>
              <Grid.Column>
                <Form.Input fluid label={<p className='contact-label'>Lokalizacja</p>} placeholder='Lokalizacja' onChange={(e, {value}) => { handleChange(value, 'location')}}/>
              </Grid.Column>
            </Grid.Row >
              <Form style={{marginTop: '10px'}}>
                <Form.Input label={<p className='contact-label'>Powierzchnia</p>}>
                  <InputNumber width='100px' range={[0, 99999]} label={`m${String.fromCharCode(178)}`} onChange={(value) => { handleChangeNumber(value, 'surface')}}></InputNumber>
                </Form.Input>
                <Form.Input label={<p className='contact-label'>Częstotliwość sprzątania</p>}>
                  <InputNumber width='100px' range={[0, 99999]} label={`/miesiąc`} onChange={(value) => { handleChangeNumber(value, 'count')}}></InputNumber>
                </Form.Input>
              </Form>
          </Grid>
          <Form style={{paddingTop: '40px'}}>
              <Form.TextArea label={<p className='contact-label'>Dodatkowe informacje</p>} placeholder='Wprowadź informacje dodatkowe...' onChange={(e, {value}) => { handleChange(value, 'info')}} /> 
              <ReCAPTCHA
                  ref={recaptcha_ref}
                  sitekey="6LcA4a0aAAAAAAas15DLnYDi9C1HTEqQ9y0E7sU7"
                  onChange={callback}
                />
              <Form.Field>
                <Popup
                  trigger={<Form.Button style={{marginTop: '10px', float: 'left'}} onClick={handleClick}>Wyślij</Form.Button>}
                  content='Twoja wiadomość została wysłana.'
                  open={send_popup}
                  inverted
                  >
                </Popup>
              </Form.Field>
            </Form>
        </Segment>
      </div>
    </div>
  );
})

const CustomInput = ({error, label, placeholder, onChange }) => {

  return (
    <Popup
      style={{padding: '1px'}}
        trigger={<Form.Input fluid label={label} placeholder={placeholder} onChange={onChange}/>}
      open={error}
      offset={[0,-4]}
      basic
    >
      <Popup.Content>
        <Label color='red' style={{fontWeight: 'normal'}}>
          <Icon name='exclamation' /> Wypełnij to pole.
        </Label>
      </Popup.Content>
    </Popup>
  )
}

const InputPhone = ({error, label, placeholder, onChange }) => {

  const handleChange = (e, { value }) => {
    let pattern = /^\d+$/;
    if(pattern.test(value)){
      setValue(value);
      onChange(value);
    }
    else if(value === ''){ 
      setValue('');
      onChange('');
    }
  }

  const[value, setValue] = useState('');

  return (
    <Popup
      style={{padding: '1px'}}
      trigger={<Form.Input value={value} fluid label={label} placeholder={placeholder} onChange={handleChange}/>}
      open={error}
      offset={[0,-4]}
      basic
    >
      <Popup.Content>
        <Label color='red' style={{fontWeight: 'normal'}}>
          <Icon name='exclamation' /> Wypełnij to pole.
        </Label>
      </Popup.Content>
    </Popup>
  )
}

export default Contact;
