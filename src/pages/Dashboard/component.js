import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import './dashboard.scss';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ROUTES, VALIDATIONS } from '../../constants';
import { createForm, deleteForm, getForms, updateForm } from '../../api';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';

const Dashboard = () => {
  const [message, setMessage] = useState(null);
  const [forms, setForms] = useState(null);
  const [isReloading, setIsReloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteState, setDeleteState] = useState({ isOpen: false });
  const [editState, setEditState] = useState({ isOpen: false });

  const handleEdit =
    ({ id, title, isOpen }) =>
    () => {
      setEditState({
        isOpen: true,
        handleClose: () => {
          setEditState((prevState) => ({
            ...prevState,
            isOpen: false,
          }));
        },
        title: `Are you sure to delete form ${title}`,
        info: {
          id,
          title,
          isOpen,
        },
      });
    };

  const handleDelete =
    ({ id, title }) =>
    () => {
      setDeleteState({
        isOpen: true,
        handleConfirm: async () => {
          await deleteForm(id);
          setIsReloading(Math.random());
          setDeleteState((prevState) => ({
            ...prevState,
            isOpen: false,
          }));
        },
        handleClose: () => {
          setDeleteState((prevState) => ({
            ...prevState,
            isOpen: false,
          }));
        },
        title: `Are you sure to delete form ${title}`,
      });
    };

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
            {forms.length ? (
              forms.map(({ isOpen, title, id }) => {
                return (
                  <li key={id} className="forms__item">
                    <div className="forms__lock">{isOpen ? '🔓' : '🔒'}</div>
                    <div className="forms__title">
                      <Link to={`${ROUTES.FORM}/${id}`}>{title}</Link>
                    </div>
                    <div className="forms__btns">
                      <Button
                        size="sm"
                        onClick={handleEdit({ id, title, isOpen })}
                      >
                        Update
                      </Button>
                      <Button
                        onClick={handleDelete({ id, title })}
                        size="sm"
                        type="accent"
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                );
              })
            ) : (
              <li>
                <h2 className="forms__empty">You have not any form</h2>
              </li>
            )}
          </ul>
        )}
      </div>
      {deleteState.isOpen && (
        <Modal
          handleConfirm={deleteState.handleConfirm}
          handleClose={deleteState.handleClose}
          title={deleteState.title}
        />
      )}
      {editState.isOpen && (
        <Modal
          handleConfirm={() => {}}
          handleClose={editState.handleClose}
          title={editState.title}
        >
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
            initialValues={{
              title: editState.info.title,
              isOpen: editState.info.isOpen,
            }}
            onSubmit={async (values, { resetForm }) => {
              const body = new FormData();

              Object.entries(values).forEach((item) => {
                body.append(item[0], item[1]);
              });

              const { info } = await updateForm(editState.info.id, body);
              setMessage(info);

              setTimeout(() => setMessage(null), 5000);
              setIsReloading(Math.random());
              setEditState((prevState) => ({
                ...prevState,
                isOpen: false,
              }));
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

                <Button>Update</Button>
              </div>
            </Form>
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
