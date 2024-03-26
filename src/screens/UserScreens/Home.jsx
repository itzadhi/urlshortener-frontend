import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import UrlTable from '../../components/UrlTable';
import { useGetUrlsMutation } from '../../slices/urlApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserUrls } from '../../slices/urlSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/layouts/Spinner';

const Home = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [lastMonthCount, setLastMonthCount] = useState(0);

  const dispatch = useDispatch();
  const [getUrls, { isLoading }] = useGetUrlsMutation();

  const navigate = useNavigate();

  const { userUrls } = useSelector((state) => state.url);

  const getUrlsHandler = async () => {
    try {
      const res = await getUrls().unwrap();
      const formattedData = res?.map((item) => {
        const formattedDate = new Date(item?.createdAt)
          ?.toLocaleString()
          ?.split(',');

        return { ...item, createdAt: formattedDate?.[0] };
      });
      dispatch(getUserUrls(formattedData?.reverse()));
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  const viewMoreHandler = () => {
    navigate('/history');
  };

  const getCount = () => {
    let todayDate = new Date()?.toLocaleString()?.split(',');
    let formattedDate = todayDate?.[0]?.split('/');

    const today = userUrls?.reduce((sum, item) => {
      if (item?.createdAt === todayDate?.[0]) {
        sum += 1;
      }
      return sum;
    }, 0);

    setTodayCount(today);
    const last30Days = userUrls?.reduce((sum, item) => {
      let itemDate = item?.createdAt?.split('/');

      let lastMonth =
        formattedDate?.[1] === '01' ? 12 : Number(formattedDate?.[1] - 1);

      if (Number(itemDate?.[1]) === lastMonth) {
        sum += 1;
      }
      return sum;
    }, 0);
    setLastMonthCount(last30Days);
  };

  useEffect(() => {
    if (userUrls?.length === 0) {
      getUrlsHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userUrls?.length > 0) {
      getCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUrls]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <Container className='mt-4'>
          <h2 className='text-light fw-semibold mb-3'>Dashboard</h2>

          <div className='mb-5 d-flex justify-content-center mt-3 vw-75 '>
            <div className='hero text-light p-3 rounded mx-2 shadow'>
              <div className='fs-3'>Today </div>
              <div className='hero-number text-center'>{todayCount}</div>
            </div>
            <div className='hero text-light p-3 rounded shadow'>
              <div className='fs-3'>Last Month </div>
              <div className='hero-number text-center'>{lastMonthCount}</div>
            </div>
          </div>
          {userUrls?.length > 0 && (
            <div className='mb-5'>
              <h2 className='text-light fw-semibold mb-3'>Your Shorten Urls</h2>
              <div
                className='table-responsive m-auto '
                style={{ borderRadius: '.5rem' }}
              >
                <UrlTable userUrls={userUrls?.slice(0, 3)} />
                <div className='d-flex justify-content-center'>
                  <button
                    className='custom-btn px-3 py-2'
                    onClick={viewMoreHandler}
                  >
                    View More...
                  </button>
                </div>
              </div>
            </div>
          )}
        </Container>
      )}
    </div>
  );
};

export default Home;
