import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

import './details.scss';
import { createFields, getForm } from '../../api';
import Spinner from '../../components/Spinner';
import FieldsForm from './Form';
import { FIELDS_TYPES } from '../../constants';

const FormDetails = () => {
  const [details, setDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getForm(id)
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [setDetails]);

  return (
    <div className="details">
      {isLoading ? (
        <Spinner theme="dark" />
      ) : (
        <div className="details__wrapper">
          <div className="details__header">
            <h1 className="details__title">{details.title}</h1>
            <p className="details__open">{details.isOpen ? '🔓' : '🔒'}</p>
          </div>
          <Formik
            initialValues={{
              fields: [],
              type: FIELDS_TYPES[0].value,
              label: '',
              name: '',
              placeholder: '',
              default: '',
            }}
            onSubmit={async ({ fields }) => {
              const result = await createFields(id, JSON.stringify({ fields }));

              console.log(result);
            }}
          >
            <FieldsForm />
          </Formik>
        </div>
      )}
    </div>
  );
};

export default FormDetails;
