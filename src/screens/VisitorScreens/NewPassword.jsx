import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import ErrorBox from '../../components/ErrorBox';
import { useNewPasswordMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const [newPassword, { isLoading }] = useNewPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Both password are not same');
    } else {
      try {
        const res = await newPassword({
          tempToken: token,
          password: password,
        }).unwrap();
        toast.success('Your password is changed', { position: 'top-right' });
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error, { position: 'top-right' });
      }
    }
  };

  return (
    <FormContainer>
      <h3>New Password</h3>
      {error && <ErrorBox message={error} />}
      <Form onSubmit={submitHandler}>
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

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm your password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
    </FormContainer>
  );
};

export default NewPassword;
