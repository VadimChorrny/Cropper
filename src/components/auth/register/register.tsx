import { FormikProvider, Form, useFormik } from 'formik';
import React, { useState } from 'react';
import { IRegister } from '../../../interfaces/IRegister';
import { RegisterSchema } from './validation';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropperDialog from '../../common/CropperDialog';
import register from '../../../services/authentication';
import ReCAPTCHA from 'react-google-recaptcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { boolean } from 'yup';

function RegisterPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [bot, setBot] = useState<boolean>(false);

  let navigate = useNavigate();

  console.log(process.env.REACT_APP_CLIENT_ID);

  const initialValues: IRegister = {
    recaptchaToken: '',
    name: '',
    surname: '',
    email: '',
    avatar: '',
    password: '',
  };

  const onHandleSubmit = async (values: IRegister) => {
    console.log('Submit form ', values);
    try {
      if (!executeRecaptcha) {
        setBot(true);
        return;
      }
      const recaptchaToken = await executeRecaptcha();
      register(values, recaptchaToken);
      navigate('/login');
    } catch (error) {
      console.error('Problem: ', error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;

  return (
    <div>
      <h1 className='text-center'>Register Page</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <CropperDialog
              onChange={setFieldValue}
              field='avatar'
              error={errors.avatar}
              touched={touched.avatar}
              aspectRation={1 / 1}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Ваше ім'я
            </label>
            <input
              type='text'
              className={classNames(
                'form-control',
                {
                  'is-invalid': touched.name && errors.name,
                },
                {
                  'is-valid': touched.name && !errors.name,
                },
              )}
              placeholder='Приклад: Вадим...'
              id='name'
              name='name'
              onChange={handleChange}
            />
            {touched.name && errors.name && (
              <div className='invalid-feedback'>{errors.name}</div>
            )}
          </div>
          <div className='mb-3'>
            <label htmlFor='secondName' className='form-label'>
              Ваша фамілія
            </label>
            <input
              type='text'
              className={classNames(
                'form-control',
                {
                  'is-invalid': touched.surname && errors.surname,
                },
                {
                  'is-valid': touched.surname && !errors.surname,
                },
              )}
              placeholder='Приклад: Чорний...'
              id='surname'
              name='surname'
              onChange={handleChange}
            />
            {touched.surname && errors.surname && (
              <div className='invalid-feedback'>{errors.surname}</div>
            )}
          </div>
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
            <label htmlFor='tel' className='form-label'>
              Номер телефону
            </label>
            <input
              type='tel'
              className='form-control'
              id='tel'
              name='tel'
              placeholder='+380-000-00-00'
              pattern='^\+380-\d{3}-\d{2}-\d{2}$'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Придумайте свій пароль
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
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <div className='invalid-feedback'>{errors.password}</div>
            )}
          </div>
          <button type='submit' className='btn btn-primary mb-3'>
            Зареєструватися
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default RegisterPage;
