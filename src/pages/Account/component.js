import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import './account.scss';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { VALIDATIONS } from '../../constants';
import { updatePassword } from '../../api';

const Account = () => {
  const [message, setMessage] = useState(null);

  return (
    <div className="account">
      <h1 className="account__title">Account</h1>
      <ul className="account__list">
        <li className="account__item">
          <Formik
            initialValues={{
              password: '',
              newPassword: '',
              confirmationNewPassword: '',
            }}
            onSubmit={async (values, { resetForm, setFieldError }) => {
              const body = new FormData();

              Object.entries(values).forEach((item) => {
                body.append(item[0], item[1]);
              });

              try {
                const { info } = await updatePassword(body);
                setMessage(info);
                setTimeout(() => setMessage(null), 5000);
              } catch (error) {
                setFieldError(error.description.name, error.description.info);
              }
            }}
            validationSchema={yup.object().shape({
              password: yup
                .string()
                .label('Password')
                .min(VALIDATIONS.password.min)
                .max(VALIDATIONS.password.max)
                .required(),
              newPassword: yup
                .string()
                .label('New password')
                .min(VALIDATIONS.password.min)
                .max(VALIDATIONS.password.max)
                .required(),
              confirmationNewPassword: yup
                .string()
                .label('Confirmation password')
                .min(VALIDATIONS.password.min)
                .max(VALIDATIONS.password.max)
                .required()
                .oneOf(
                  [yup.ref('newPassword'), null],
                  'Confirmation password not match'
                ),
            })}
          >
            <Form>
              <div className="form">
                <h2 className="account__subtitle">Change password</h2>
                {message && <div className="account__message">{message}</div>}
                <Field
                  name="password"
                  label="Password"
                  required
                  type="password"
                  component={Input}
                />
                <Field
                  name="newPassword"
                  label="New password"
                  required
                  type="password"
                  component={Input}
                />
                <Field
                  name="confirmationNewPassword"
                  label="Confirm new password"
                  required
                  type="password"
                  component={Input}
                />
                <Button>Change password</Button>
              </div>
            </Form>
          </Formik>
        </li>
      </ul>
    </div>
  );
};

export default Account;
