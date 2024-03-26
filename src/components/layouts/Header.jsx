import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { toast } from 'react-toastify';
import { removeCredentials } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { removeUserUrls } from '../../slices/urlSlice';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logout();
      dispatch(removeCredentials());
      dispatch(removeUserUrls());
    } catch (err) {
      toast.error(err?.data?.message || err.error, { position: 'top-right' });
    }
  };

  return (
    <Navbar expand='lg' className='header'>
      <Container>
        <Navbar.Brand as={Link} to={'/'} className='fs-3 fw-bold text-dark'>
          {'<Linkly />'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link
              as={NavLink}
              to={`/shortener`}
              className='fs-5 fw-semibold text-dark'
            >
              Create Url
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              onClick={logoutHandler}
              className='fs-5 fw-semibold text-dark'
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
