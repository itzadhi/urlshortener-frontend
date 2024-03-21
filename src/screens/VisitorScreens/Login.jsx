import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
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
  const [userName, setUserName] = useState('');
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
      console.log(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    setActivateUserInfo('');
    setError('');
    e.preventDefault();
    try {
      const res = await login({ userName, password }).unwrap();

      if (!res?.isEmailVerified) {
        setActivateUserInfo(
          'You need to verify your email id, so you will receive a verification mail to your inbox or spam'
        );
      } else {
        dispatch(setCredentials({ ...res }));
      }
    } catch (err) {
      setError(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (activateUserStatus !== '') {
      activationHandler();
    }
  }, []);

  return (
    <FormContainer>
      <h3>Login</h3>
      {activateUserInfo && <InfoBox message={activateUserInfo} />}
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row className='py-3'>
          <Col className='d-flex justify-content-between'>
            <span>
              <input type='checkbox' /> Remember Me
            </span>

            <Link to='/forgot-password' className='text-decoration-none'>
              Forgot Password?
            </Link>
          </Col>
        </Row>

        <Button
          // disabled={isLoading}
          type='submit'
          variant='primary'
          className='my-2 w-100 fs-5'
        >
          Login
        </Button>
      </Form>

      <Link to='/register'>
        {' '}
        <Button
          disabled={isLoading}
          type='submit'
          variant='outline-primary'
          className='my-2 w-100 fs-5'
        >
          Register
        </Button>
      </Link>

      {/* {isLoading && <Loader />} */}
    </FormContainer>
  );
};

export default Login;
