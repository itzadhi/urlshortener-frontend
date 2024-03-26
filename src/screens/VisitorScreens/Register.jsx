import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import ErrorBox from '../../components/ErrorBox';
import { useRegisterMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    setError('');
    e.preventDefault();
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
      }).unwrap();

      toast.info(
        'You need to verify your email id, so you will receive a verification mail to your inbox or spam',
        { position: 'top-right' }
      );
      navigate('/login');
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h3>Register</h3>
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='firstname'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='custom-input shadow-none'
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='lastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='custom-input shadow-none'
            required={true}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className='my-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            'Register'
          )}
        </button>
      </Form>

      <Link to='/login'>
        {' '}
        <button
          disabled={isLoading}
          type='submit'
          className='my-2 p-2 w-100 fs-5 custom-outline-btn'
        >
          Login
        </button>
      </Link>
    </FormContainer>
  );
};

export default Register;
