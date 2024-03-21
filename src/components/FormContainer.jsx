import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='vh-100 justify-content-center align-items-center'>
        <Col xs={11} md={8} lg={9} xl={5} className='card p-5 shadow'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
