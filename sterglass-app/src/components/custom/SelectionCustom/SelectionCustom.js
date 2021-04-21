import React, { useEffect, useState } from "react";
import { Form, Label } from 'semantic-ui-react';
import './SelectionCustom.css';

function SelectionCustom(props) {

  const handleChange = (event, {value}) => {
    
    if(!isDisabledOption(value)){
      props.onChange(value);
    }else{
      setValue('');
    }
  }

  const isDisabled = (data) => {
    if(data.length > 0){
      return false;
    }
    return true;
  }

  const isDisabledOption = (id_option) => {
    let found_option = props.options.find(option => option.id === id_option);
    return found_option.disabled;
  }

  const mapOptions = (options) => {
    let mapped_data = options.map(option => {
        let is_disabled = false;
        if(option['disabled'] !== undefined) is_disabled = option['disabled'];
        return {key: `${option['name']}_${option['id']}`, value: option['id'], text: option['name'], disabled: is_disabled};
    })
    return mapped_data;
  }

  const[value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  return <Form.Select
                className='selection-custom-select'
                label={<div><Label className='select-header' as='h5'>{props.label}</Label></div>}
                compact
                value={value}
                placeholder={props.placeholder}
                selection
                onChange={handleChange}
                options={mapOptions(props.options)}
                disabled={isDisabled(props.options)}/>;
}

export default SelectionCustom;
