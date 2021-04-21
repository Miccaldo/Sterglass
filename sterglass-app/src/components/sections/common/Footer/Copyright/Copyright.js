import React from "react";
import './Copyright.css';

function Copyright(props) {

  const date = new Date();

  return (
    <div className='copyright'>
      <p style={{textAlign: 'left'}}>Copyright &copy; {date.getFullYear()} Developed by Miccaldo. All Rights Reserved. </p>
    </div>    
  );
}

export default Copyright;
