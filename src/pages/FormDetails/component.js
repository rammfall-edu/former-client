import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './details.scss';
import { getForm } from '../../api';
import Spinner from '../../components/Spinner';

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
        <div className="details__header">
          <h1 className="details__title">{details.title}</h1>
          <p className="details__open">{details.isOpen ? '🔓' : '🔒'}</p>
        </div>
      )}
    </div>
  );
};

export default FormDetails;
