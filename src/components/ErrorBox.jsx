import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div
      className='bg-danger text-white d-flex py-2 px-3 rounded'
      style={{ backgroundColor: '#494eea' }}
    >
      <p className='align-self-center m-0'>{message}</p>
    </div>
  );
};

export default ErrorBox;
