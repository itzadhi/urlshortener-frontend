import React from 'react';

const InfoBox = ({ message }) => {
  return (
    <div className='bg-primary p-1 text-white d-flex rounded'>
      <p className='align-self-center'>{message}</p>
    </div>
  );
};

export default InfoBox;
