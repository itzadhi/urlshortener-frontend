import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useForgotPasswordMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res?.message, {
        position: 'top-right',
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
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
            className='custom-input shadow-none'
            required={true}
          ></Form.Control>
        </Form.Group>

        <button
          disabled={isLoading}
          type='submit'
          className='my-2 p-2 w-100 fs-5 custom-btn'
        >
          {isLoading ? (
            <>
              <i className='fa fa-spinner fa-spin'></i> Loading
            </>
          ) : (
            'Submit'
          )}
        </button>
      </Form>

      <Link to='/login'>
        {' '}
        <button
          disabled={isLoading}
          type='submit'
          className='my-2 w-100 fs-6'
          style={{
            backgroundColor: 'transparent',
            border: '0',
            color: '#494eea',
          }}
        >
          Back to Login
        </button>
      </Link>
    </FormContainer>
  );
};

export default ForgotPassword;
