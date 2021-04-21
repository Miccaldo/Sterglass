import React, { useState } from "react";
import { Input, Label, Button } from "semantic-ui-react";
import './InputNumber.css';

function InputNumber(props) {

  const[count, setCount] = useState('');

  const handleChange = (e, data) => {

    if(data.value.match(/^(-?\d+)$/) !== null){
      let value = Number(data.value);
      if(props.range !== undefined){
        if(value >= props.range[0] && value <= props.range[1]){
           setCount(Number(value));
           props.onChange(Number(value))
        }
      }else{
        setCount(Number(value));
        props.onChange(Number(value))
      }
    }
    else if(data.value === ''){ 
      setCount(data.value);
      props.onChange(data.value)
    }
    else if(data.value === '-'){
      if(props.range !== undefined){
        if(props.range[0] < 0){
           setCount(data.value);
           props.onChange(data.value)
        }
      }else{
         setCount(data.value);
         props.onChange(data.value)
       }
    }
  }

  const handleClick = (counter) => {
    if(count === '-'){
      setCount(counter);
    }else{
      let value = count + counter;
      if(props.range !== undefined){
        if(value >= props.range[0] && value <= props.range[1]){
          setCount(Number(value));
          props.onChange(Number(value));
        }else { 
          setCount(Number(count));
          props.onChange(Number(value))
        }
      }else{
        setCount(Number(value));
        props.onChange(Number(value))
      }
    }
  }

  const getLabelPosition = () => {
    if(props.label !== undefined){ return 'right'; }
    return 'left';
  }

  const InputLabel = () => {
    if(props.label !== undefined){ return <Label style={{borderRadius: '0px 4px 4px 0px'}} content={props.label}></Label>}
    else{ return <div></div>}
  }

  const position = getLabelPosition();
  

  return  ( <div style={{display: 'flex', marginRight: '20px'}}>
            <Input labelPosition={position} value={count} type='text' placeholder={props.placeholder} onChange={handleChange}>
              <input style={{height: '36px', width: `${props.width}`, borderRadius: '0px 0px 0px 0px'}}/>
              <Button.Group vertical className='input-number-button-container'>
                <Button id='input-number-button-up' icon='up chevron' onClick={() => handleClick(1)}></Button>
                <Button id='input-number-button-down' icon='down chevron' onClick={() => handleClick(-1)}></Button>
              </Button.Group>
              <InputLabel></InputLabel>
            </Input>
          </div>
          );
}

export default InputNumber;
