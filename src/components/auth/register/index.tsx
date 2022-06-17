import {FormikProvider, Form, useFormik} from 'formik';
import React, {useState} from 'react'
import {IRegister} from './types'
import {RegisterSchema} from "./validation";
import classNames from "classnames";
import {Link} from "react-router-dom";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function RegisterPage() {

    const initialValues: IRegister = {
        fistName: "",
        secondName: "",
        email: "",
        phone: "",
        photo: "",
        password: "",
        passwordConfirmation: ""
    }

    const onHandleSubmit = async (values: IRegister) => {
        console.log("Submit form ", values);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    })

    const {errors, touched, handleSubmit, handleChange} = formik;

    return (
        <div>
            <h1 className='text-center'>Register Page</h1>
            <FormikProvider value={formik}>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            Ваше ім'я
                        </label>
                        <input
                            type="text"
                            className={classNames("form-control",
                                {
                                    "is-invalid": touched.fistName && errors.fistName
                                },
                                {
                                    "is-valid": touched.fistName && !errors.fistName
                                }
                            )}
                            placeholder="Приклад: Вадим..."
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                        />
                        {touched.fistName && errors.fistName &&
                            <div className="invalid-feedback">{errors.fistName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="secondName" className="form-label">
                            Ваша фамілія
                        </label>
                        <input
                            type="text"
                            className={classNames("form-control",
                                {
                                    "is-invalid": touched.secondName && errors.secondName
                                },
                                {
                                    "is-valid": touched.secondName && !errors.secondName
                                }
                            )}
                            placeholder="Приклад: Чорний..."
                            id="secondName"
                            name="secondName"
                            onChange={handleChange}
                        />
                        {touched.secondName && errors.secondName &&
                            <div className="invalid-feedback">{errors.secondName}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Електронна адреса
                        </label>
                        <input
                            type="email"
                            placeholder="example: test@mail.com"
                            className={classNames("form-control",
                                {
                                    "is-invalid": touched.email && errors.email
                                },
                                {
                                    "is-valid": touched.email && !errors.email
                                }
                            )}
                            id="email"
                            name="email"
                            onChange={handleChange}
                        />
                        {touched.email && errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">
                            Номер телефону
                        </label>
                        <input
                            type="tel"
                            className="form-control"
                            id="tel"
                            name="tel"
                            placeholder="+380-000-00-00" pattern="^\+380-\d{3}-\d{2}-\d{2}$"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Придумайте свій пароль
                        </label>
                        <input
                            type="password"
                            placeholder="Уведіть свій пароль..."
                            name="password"
                            id="password"
                            className={classNames("form-control",
                                {
                                    "is-invalid": touched.password && errors.password
                                },
                                {
                                    "is-valid": touched.password && !errors.password
                                }
                            )}
                            onChange={handleChange}
                        />
                        {touched.password && errors.password &&
                            <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordConfirmation" className="form-label">
                            Підтвердіть свій пароль
                        </label>
                        <input
                            type="text"
                            placeholder="Підтвердіть свій пароль..."
                            name="passwordConfirmation"
                            id="passwordConfirmation"
                            className={classNames("form-control",
                                {
                                    "is-invalid": touched.passwordConfirmation && errors.passwordConfirmation
                                },
                                {
                                    "is-valid": touched.passwordConfirmation && !errors.passwordConfirmation
                                }
                            )}
                            onChange={handleChange}
                        />
                        {touched.passwordConfirmation && errors.passwordConfirmation &&
                            <div className="invalid-feedback">{errors.passwordConfirmation}</div>}
                    </div>
                    <Link to="/login">
                        <button type="submit" className="btn btn-primary">
                            Зареєструватися
                        </button>
                    </Link>
                </Form>
            </FormikProvider>
        </div>
    )
}

export default RegisterPage