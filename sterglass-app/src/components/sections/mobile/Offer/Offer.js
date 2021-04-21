import React, { useEffect, useState } from "react";
import { Form, Header, Label, Icon, Button, Image, Segment, Grid, Divider } from "semantic-ui-react";
import APIService from '../../../../services/APIService'
import SelectionCustom from '../../../custom/SelectionCustom/SelectionCustom'
import "./Offer.css";
import offerImage from '../../../../images/offer.jpg'
const { REACT_APP_OFFER, REACT_APP_SERVICE, REACT_APP_SERVICES,  REACT_APP_SERVICE_TYPES, REACT_APP_SERVICE_TYPE, REACT_APP_PARAMETERS } = process.env;

const Offer = React.forwardRef(function Offer(props, ref) {

  const offer_url = REACT_APP_OFFER;
  const api_service = new APIService()
  const[services, setServices] = useState([]);
  const[service_types, setServiceTypes] = useState([]);
  const[parameters, setParameters] = useState([]);
  const[description, setDescription] = useState('');
  const[price, setPrice] = useState();
  const[selections, setSelections] = useState({service: '', service_type: '', parameter: ''})

  useEffect(() => {
    if(ref.current !== undefined && ref.current !== null){
      let offset = ref.current.offsetTop + props.correct_offset;
      if(props.scroll >= offset){
        props.onVisible('Cennik');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scroll])

  const fetchServiceTypes = async(id_service) => {
    let service_types = await api_service.receiveData(offer_url + `${REACT_APP_SERVICE}/${id_service}/${REACT_APP_SERVICE_TYPES}/`);
    setServiceTypes(service_types);
  }

  const fetchParameters = async(id_service_type) => {
    let parameters = await api_service.receiveData(offer_url + `${REACT_APP_SERVICE_TYPE}/${id_service_type}/${REACT_APP_PARAMETERS}/`);
    setParameters(parameters);
  }

  useEffect(() => {
    const offer_url = REACT_APP_OFFER;
    const api_service = new APIService()
    const fetchServices = async() => {
      let services = await api_service.receiveData(offer_url + REACT_APP_SERVICES);
      setServices(services);
    }
    fetchServices();
  }, [])


  const handleChangeService = (id_service) => {
    setSelections({service: id_service, service_type: '', parameter: ''});
    setServiceTypes([]);
    setParameters([]);
    setPrice('');

    let found_service = services.find(service => service.id === id_service);
    found_service.price === '' ?  fetchServiceTypes(found_service.id) : setPrice(found_service.price);
    setDescription(found_service.description);
  }

  const handleChangeServiceType = (id_service_type) => {
    setSelections({...selections, service_type: id_service_type, parameter: ''});
    setParameters([]);
    setPrice('');

    let found_service_type = service_types.find(service_type => service_type.id === id_service_type);
    found_service_type.price === '' ?  fetchParameters(found_service_type.id) : setPrice(found_service_type.price); 
  }
  
  const handleChangeParameter = (id_parameter) => {
    let found_parameter = parameters.find(parameter => parameter.id === id_parameter);
    setPrice(found_parameter.price);
    setSelections({...selections, parameter: id_parameter});
  }

  const handleClickForm = () => {
    props.onClickForm();
  }

  return (
    <div ref={ref}>
        <Header style={{marginBottom: '30px', marginTop: '50px'}} color='grey' as='h1'>
          CENNIK
        </Header>
          <div className='mobile-offer-outer-div'>
            <Segment className='mobile-offer-segment' raised>
                <Form>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <SelectionCustom
                        label='Usługa'
                        placeholder='Usługa'
                        options={services}
                        value={selections.service}
                        onChange={handleChangeService}
                      />
                    </Form.Field>
                    <Form.Field>
                      <SelectionCustom
                      label='Typ usługi'
                      placeholder='Typ usługi'
                      options={service_types}
                      value={selections.service_type}
                      onChange={handleChangeServiceType}
                      />
                    </Form.Field>
                    <Form.Field>
                      <SelectionCustom
                        label='Powierzchnia'
                        width='225px'
                        placeholder='Powierzchnia'
                        options={parameters}
                        value={selections.parameter}
                        onChange={handleChangeParameter}
                      />
                    </Form.Field>
                  </Form.Group>
                  </Form>
                  <Divider fitted style={{marginBottom: '30px', marginTop: '20px'}}></Divider>
                  <div className='mobile-offer-description-container'>
                  <Header block as='h5' style={{padding: '5px 10px 5px 10px'}}>Opis</Header>
                  <div className='mobile-offer-description-inner'>
                    <p style={{marginLeft: '10px', marginRight: '10px'}}>{description}</p>
                  </div>
                </div>
                <div>
                <Label className='mobile-offer-price' size='large' style={{float: 'left'}}>
                  <Icon name='dollar sign'/>
                  CENA
                  <Label.Detail>{price}</Label.Detail>
                </Label>
              </div>
            </Segment>
          </div>
      </div>
  );
})

export default Offer;
