import { FormikProvider, Form, useFormik } from 'formik';
import React, { useState } from 'react';
import { IRegister } from '../../../interfaces/IRegister';
import { RegisterSchema } from './validation';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import CropperDialog from '../../common/CropperDialog';
import register from '../../../services/authentication';
import ReCAPTCHA from 'react-google-recaptcha';

function RegisterPage() {
  const initialValues: IRegister = {
    name: '',
    surname: '',
    email: '',
    avatar: '',
    password: '',
  };

  const [state, setState] = useState<boolean>(true);

  const onHandleSubmit = async (values: IRegister) => {
    console.log('Submit form ', values);
    register(values);
  };

  const onChange = (value: any) => {
    if (value) {
      setState(false);
    } else {
      setState(true);
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
          <div className='mb-3'>
            <ReCAPTCHA
              sitekey='6Le_47EgAAAAAOG6fscbSuEJAsHqq6l7ag4SgVQB'
              onChange={onChange}
            />
          </div>
          {/* <div className='mb-3'>
            <label htmlFor='passwordConfirmation' className='form-label'>
              Підтвердіть свій пароль
            </label>
            <input
              type='text'
              placeholder='Підтвердіть свій пароль...'
              name='passwordConfirmation'
              id='passwordConfirmation'
              className={classNames(
                'form-control',
                {
                  'is-invalid':
                    touched.passwordConfirmation && errors.passwordConfirmation,
                },
                {
                  'is-valid':
                    touched.passwordConfirmation &&
                    !errors.passwordConfirmation,
                },
              )}
              onChange={handleChange}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
              <div className='invalid-feedback'>
                {errors.passwordConfirmation}
              </div>
            )}
          </div> */}
          ,
          <button
            type='submit'
            className='btn btn-primary mb-3'
            disabled={state}
          >
            Зареєструватися
          </button>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default RegisterPage;
