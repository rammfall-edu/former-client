import React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import './login.scss';
import { loginUser } from '../../api';
import { ROUTES, VALIDATIONS } from '../../constants';
import { Field, Form, Formik } from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = ({ setAuthInfo }) => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={async (values, { setFieldError }) => {
        const body = new FormData();

        Object.entries(values).forEach((item) => {
          body.append(item[0], item[1]);
        });

        try {
          const info = await loginUser(body);
          setAuthInfo(info);
          navigate(ROUTES.DASHBOARD);
        } catch (error) {
          setFieldError(error.description.name, error.description.info);
        }
      }}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email()
          .min(VALIDATIONS.email.min)
          .max(VALIDATIONS.email.max)
          .required(),
        password: yup
          .string()
          .min(VALIDATIONS.password.min)
          .max(VALIDATIONS.password.max)
          .required(),
      })}
    >
      <Form>
        <div className="form">
          <Field
            name="email"
            type="email"
            label="Email"
            required
            component={Input}
          />
          <Field
            name="password"
            type="password"
            label="Password"
            required
            component={Input}
          />
          <Button>Log in</Button>
        </div>
      </Form>
    </Formik>
  );
};

Login.propTypes = {
  setAuthInfo: PropTypes.func.isRequired,
};

export default Login;
