import React from 'react';
import spinner from '../../assets/spinner.gif';
import { Row } from 'react-bootstrap';

function Spinner() {
  return (
    <Row
      className='justify-content-center align-items-center'
      style={{ height: '80vh' }}
    >
      <img
        src={spinner}
        style={{ width: '10rem', margin: 'auto', display: 'block' }}
        alt='Loading...'
      />
    </Row>
  );
}

export default Spinner;
