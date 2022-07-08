import { Form, FormikProvider, useFormik } from 'formik';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { RegisterSchema } from '../register/validation';
import { ILogin } from '../../../interfaces/ILogin';
import { gapi } from 'gapi-script';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import googleAuth from '../../../services/googleAuth';
import { IGoogleAuthentication } from '../../../interfaces/IGoogleAuthentication';
import axios from 'axios';
import { AUTHENTICATION_URLS } from '../../../constants/api/urls';
import { login } from '../../../services/authentication';

const LoginPage = () => {
  const initialValues: ILogin = {
    email: '',
    password: '',
  };

  const googleInitialValues: IGoogleAuthentication = {
    tokenId: '',
  };

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', start);
  }, []);

  const onHandleSubmit = async (values: ILogin) => {
    console.log('Submit form ', values);
    login(values);
  };

  const onGoogleAuthSubmit = async (values: IGoogleAuthentication) => {
    googleAuth(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });

  let navigate = useNavigate();

  const { errors, touched, handleSubmit, handleChange } = formik;

  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    console.log('Google response: ', response);
    axios
      .post(AUTHENTICATION_URLS.GOOGLE_AUTH, {
        idToken: (response as GoogleLoginResponse).tokenId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1 className='text-center'>Register Page</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Електронна адреса
            </label>
            <input
              type='email'
              placeholder='example: test@mail.com'
              className={classNames(
                'form-control',
                {
                  'is-invalid': touched.email && errors.email,
                },
                {
                  'is-valid': touched.email && !errors.email,
                },
              )}
              id='email'
              name='email'
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <div className='invalid-feedback'>{errors.email}</div>
            )}
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Уведіть свій пароль
            </label>
            <input
              type='password'
              placeholder='Уведіть свій пароль...'
              name='password'
              id='password'
              className={classNames(
                'form-control',
                {
                  'is-invalid': touched.password && errors.password,
                },
                {
                  'is-valid': touched.password && !errors.password,
                },
              )}
            />
            {touched.password && errors.password && (
              <div className='invalid-feedback'>{errors.password}</div>
            )}
          </div>
          <div className='mb-3'>
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID as string}
              buttonText='Google Login'
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              // cookiePolicy={'http://localhost:3000'}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Увійти
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default LoginPage;
