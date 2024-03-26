import React from 'react';
import { Row } from 'react-bootstrap';

function Spinner() {
  return (
    <Row
      className='justify-content-center align-items-center'
      style={{ height: '80vh' }}
    >
      <div class='custom-loader'></div>
    </Row>
  );
}

export default Spinner;
