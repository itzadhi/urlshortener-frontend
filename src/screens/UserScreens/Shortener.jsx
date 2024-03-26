import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useCreateUrlMutation } from '../../slices/urlApiSlice';
import { IoCopyOutline, IoCopy } from 'react-icons/io5';

const Shortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copyText, setCopyText] = useState(false);

  const [createUrl, { isLoading }] = useCreateUrlMutation();

  const createUrlHandler = async () => {
    if (longUrl?.length === 0) {
      toast.error('Please enter the url', { position: 'top-right' });
      return;
    }
    try {
      const res = await createUrl({ longUrl }).unwrap();
      setShortUrl(res?.shortenUrl);
      toast.success('Your url has created sucessfully', {
        position: 'top-right',
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (shortUrl?.length === 0 && copyText) {
      setCopyText(false);
    }
  }, [shortUrl]);

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center align-items-center'>
        <Col
          xs={11}
          md={12}
          lg={12}
          xl={8}
          className='card p-5 shadow url-card'
        >
          <h2 className='mb-3 text-center fw-semibold'>Create your url</h2>
          <div className='d-inline-flex mb-3 url-content'>
            <Form.Control
              className='p-3 shadow-none text-dark fs-5 custom-input'
              placeholder='Enter the url'
              required={true}
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              disabled={isLoading}
              className='fs-5 custom-btn url-btn mx-2 px-3'
              onClick={createUrlHandler}
            >
              Shorten
            </button>
          </div>

          {shortUrl && (
            <Row className='mt-5 justify-content-center align-items-center'>
              <h3 className='text-center'>Your shorten url</h3>
              <InputGroup className='w-75'>
                <Form.Control
                  className='text-dark fs-6 custom-input shadow-none'
                  value={shortUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                />
                <CopyToClipboard
                  text={shortUrl}
                  onCopy={() => {
                    setCopyText(true);
                    toast.info('Copied', {
                      position: 'top-right',
                    });
                  }}
                >
                  <Button
                    className='align-middle'
                    style={{ background: '#494eea' }}
                  >
                    {copyText ? <IoCopy /> : <IoCopyOutline />}
                  </Button>
                </CopyToClipboard>
              </InputGroup>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Shortener;
