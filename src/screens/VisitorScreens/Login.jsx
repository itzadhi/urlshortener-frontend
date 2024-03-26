import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  useActivateUserMutation,
  useLoginMutation,
} from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import ErrorBox from '../../components/ErrorBox';
import InfoBox from '../../components/InfoBox';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [activateUserInfo, setActivateUserInfo] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [activateUser] = useActivateUserMutation();

  const { activateUserStatus } = useSelector((state) => state.auth);

  const activationHandler = async () => {
    try {
      const res = await activateUser({ userId: activateUserStatus }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(
        'While activating your account, something went wrong. Please login again',
        { position: 'top-right' }
      );
    }
  };

  const submitHandler = async (e) => {
    setActivateUserInfo('');
    setError('');
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      if (!res?.isEmailVerified) {
        setActivateUserInfo(
          'You need to verify your email id, so you will receive a verification mail to your inbox or spam'
        );
      } else {
        dispatch(setCredentials({ ...res }));
      }
    } catch (err) {
      setError(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (activateUserStatus !== '') {
      activationHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormContainer>
      <h3>Login</h3>
      {activateUserInfo && <InfoBox message={activateUserInfo} />}
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='custom-input shadow-none'
            required={true}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
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

        <Row className='py-3'>
          <Col className='d-flex justify-content-between'>
            <span>
              <input type='checkbox' /> Remember Me
            </span>

            <Link
              to='/forgot-password'
              className='text-decoration-none text-end'
              style={{ color: '#494eea' }}
            >
              Forgot Password?
            </Link>
          </Col>
        </Row>

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
            'Login'
          )}
        </button>
      </Form>

      <Link to='/register'>
        {' '}
        <button
          disabled={isLoading}
          type='submit'
          className='my-2 p-2 w-100 fs-5 custom-outline-btn'
        >
          Register
        </button>
      </Link>
    </FormContainer>
  );
};

export default Login;
