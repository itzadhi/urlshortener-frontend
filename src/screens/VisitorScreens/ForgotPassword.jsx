import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useForgotPasswordMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      console.log('a', res);
      toast.success(res?.message, {
        position: 'top-right',
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h3>Forgot Password</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          disabled={isLoading}
          type='submit'
          variant='primary'
          className='my-2 w-100 fs-5'
        >
          Submit
        </Button>
      </Form>

      <Link to='/login'>
        {' '}
        <Button
          // disabled={isLoading}
          type='submit'
          className='my-2 w-100 fs-6 text-primary'
          style={{ backgroundColor: 'transparent', border: '0' }}
        >
          Back to Login
        </Button>
      </Link>
    </FormContainer>
  );
};

export default ForgotPassword;
