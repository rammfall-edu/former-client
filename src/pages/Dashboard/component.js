import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import './dashboard.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { VALIDATIONS } from '../../constants';
import { createForm, getForms } from '../../api';
import Spinner from '../../components/Spinner';

const Dashboard = () => {
  const [message, setMessage] = useState(null);
  const [forms, setForms] = useState(null);
  const [isReloading, setIsReloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getForms().then((forms) => {
      setIsLoading(true);
      setForms(forms);
      setIsLoading(false);
    });
  }, [setForms, isReloading, setIsLoading]);

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dashboard__title">Forms</h1>
        <Formik
          validationSchema={yup.object().shape({
            title: yup
              .string()
              .label('Title')
              .min(VALIDATIONS.formTitle.min)
              .max(VALIDATIONS.formTitle.max)
              .required(),
            isOpen: yup.boolean(),
          })}
          initialValues={{ title: '', isOpen: true }}
          onSubmit={async (values, { resetForm }) => {
            const body = new FormData();

            Object.entries(values).forEach((item) => {
              body.append(item[0], item[1]);
            });

            const { info } = await createForm(body);
            setMessage(info);

            setTimeout(() => setMessage(null), 5000);
            resetForm();
            setIsReloading(Math.random());
          }}
        >
          <Form>
            {message && <div className="dashboard__message">{message}</div>}
            <div className="dashboard__form">
              <Field name="title" label="Title" required component={Input} />
              <Field
                name="isOpen"
                label="Is Open"
                required
                type="checkbox"
                component={Input}
              />

              <Button>Create</Button>
            </div>
          </Form>
        </Formik>

        {isLoading ? (
          <div className="dashboard__loader">
            <Spinner theme="dark" />
          </div>
        ) : (
          <ul className="forms">
            {forms.map(({ isOpen, title, id }) => {
              return (
                <li key={id} className="forms__item">
                  <div className="forms__lock">{isOpen ? '🔓' : '🔒'}</div>
                  <div className="forms__title">{title}</div>
                  <div className="forms__btns">
                    <Button size="sm">Update</Button>
                    <Button size="sm" type="accent">
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
