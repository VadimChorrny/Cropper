import {Form, FormikProvider, useFormik} from "formik";
import classNames from "classnames";
import {Link} from "react-router-dom";
import React from "react";
import {RegisterSchema} from "../register/validation";
import {ILogin} from "./types";


const LoginPage = () => {
    const initialValues: ILogin = {
        email: "",
        password: "",
    }

    const onHandleSubmit = async (values: ILogin) => {
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
                        <label htmlFor="password" className="form-label">
                            Уведіть свій пароль
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
                        />
                        {touched.password && errors.password &&
                            <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <Link to="/">
                        <button type="submit" className="btn btn-primary">
                            Увійти
                        </button>
                    </Link>
                </Form>
            </FormikProvider>
        </div>
    );
}

export default LoginPage;