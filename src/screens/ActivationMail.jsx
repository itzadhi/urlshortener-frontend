import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setUserStatus } from '../slices/authSlice';

const ActivationMail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserStatus(id));
    navigate('/login');
  }, []);

  return null;
};

export default ActivationMail;
