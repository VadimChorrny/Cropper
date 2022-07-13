import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../services/authentication';
import { store } from '../../../store';

const Navbar = () => {
  let isAuth = useSelector((state: any) => state.authReducer.isAuthUser);

  let navigate = useNavigate();

  const logout = () => {
    logoutUser();
    navigate('/');
  };
  return (
    <header>
      <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Головна
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/'>
                  Home
                </Link>
              </li>
            </ul>
            {isAuth ? (
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <button className='btn btn-danger' onClick={logout}>
                    Вихід
                  </button>
                </li>
              </ul>
            ) : (
              <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Вхід
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>
                    Реєстрація
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
