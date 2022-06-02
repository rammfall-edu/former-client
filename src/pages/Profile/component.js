import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { createUpdateProfile, getProfile } from '../../api';
import { VALIDATIONS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingProfile } from '../../store/profile/selectors';
import { fillProfile, loadingProfile } from '../../store/profile/actions';

const Profile = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingProfile);
  const profile = useSelector(getProfile);
  console.log(profile);

  useEffect(() => {
    getProfile().then((profile) => {
      dispatch(fillProfile('firstName' in profile ? profile : {}));
      dispatch(loadingProfile(false));
    });
  }, [dispatch, fillProfile, loadingProfile]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        phoneNumber: profile?.phoneNumber,
        dateOfBirth: profile?.dateOfBirth,
      }}
      validationSchema={yup.object().shape({
        firstName: yup
          .string()
          .label('First name')
          .min(VALIDATIONS.firstName.min)
          .max(VALIDATIONS.firstName.max),
        lastName: yup
          .string()
          .label('Last name')
          .min(VALIDATIONS.lastName.min)
          .max(VALIDATIONS.lastName.max),
        phoneNumber: yup
          .string()
          .label('Phone number')
          .min(VALIDATIONS.phoneNumber.min)
          .max(VALIDATIONS.phoneNumber.max),
        dateOfBirth: yup.date().label('Date of birth'),
      })}
      onSubmit={async (values) => {
        const body = new FormData();

        Object.entries(values).forEach((item) => {
          body.append(item[0], item[1]);
        });

        const profileInfo = await createUpdateProfile(
          body,
          profile ? 'PUT' : 'POST'
        );
        dispatch(fillProfile(profileInfo));
      }}
    >
      <Form>
        <div className="form">
          <Field name="firstName" label="First name" component={Input} />
          <Field name="lastName" label="Last name" component={Input} />
          <Field name="phoneNumber" label="Phone number" component={Input} />
          <Field
            name="dateOfBirth"
            label="Date of birth"
            type="datetime-local"
            component={Input}
          />
          <Button buttonType="submit" isLoading={isLoading}>
            {profile ? 'Update' : 'Create'}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default Profile;
