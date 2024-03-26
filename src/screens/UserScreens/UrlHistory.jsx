import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import UrlTable from '../../components/UrlTable';
import { useGetUrlsMutation } from '../../slices/urlApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUrls } from '../../slices/urlSlice';
import { toast } from 'react-toastify';
import moment from 'moment';

const UrlHistory = () => {
  const dispatch = useDispatch();
  const [getUrls] = useGetUrlsMutation();

  const { userUrls } = useSelector((state) => state.url);

  const getUrlsHandler = async () => {
    try {
      const res = await getUrls().unwrap();
      const formattedData = res?.map((item) => {
        const formattedDate = moment
          ?.utc(item?.createdAt)
          ?.format('DD-MM-YYYY');
        return { ...item, createdAt: formattedDate };
      });
      dispatch(getUserUrls(formattedData));
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userUrls?.length === 0) {
      getUrlsHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUrls]);

  return (
    <Container className='mt-5'>
      {userUrls?.length > 0 && (
        <div className='mb-5' style={{ width: '80vw', margin: 'auto' }}>
          <h1 className='text-light fw-semibold mb-3'>Your Shorten Urls</h1>
          <div
            className='table-responsive m-auto'
            style={{ borderRadius: '.5rem' }}
          >
            <UrlTable userUrls={userUrls} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default UrlHistory;
