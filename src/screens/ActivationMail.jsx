import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setUserStatus } from '../slices/authSlice';
import { toast } from 'react-toastify';

const ActivationMail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserStatus(id));
    toast.info(
      'Your account has been activating, soon you will be redirected to the home page',
      {
        position: 'top-right',
      }
    );
    navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default ActivationMail;
