import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

import Input from '../../components/Input';
import './register.scss';
import Button from '../../components/Button';
import { registerUser } from '../../api';
import { VALIDATIONS } from '../../constants';

const Register = () => {
  return (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={async (values, { setFieldError }) => {
        const body = new FormData();

        Object.entries(values).forEach((item) => {
          body.append(item[0], item[1]);
        });

        try {
          await registerUser(body);
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
        username: yup
          .string()
          .min(VALIDATIONS.username.min)
          .max(VALIDATIONS.username.max)
          .required(),
        password: yup
          .string()
          .min(VALIDATIONS.password.min)
          .max(VALIDATIONS.password.max)
          .required(),
        confirmationPassword: yup
          .string()
          .label('Confirmation password')
          .min(VALIDATIONS.password.min)
          .max(VALIDATIONS.password.max)
          .required()
          .oneOf(
            [yup.ref('password'), null],
            'Confirmation password not match'
          ),
      })}
    >
      <Form>
        <div className="form">
          <Field name="username" label="Username" required component={Input} />
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
          <Field
            name="confirmationPassword"
            type="password"
            label="Confirm password"
            required
            component={Input}
          />
          <Button>Sign up</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
