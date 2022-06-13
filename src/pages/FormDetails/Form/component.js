import React from 'react';
import { Form, useFormikContext, Field } from 'formik';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { FIELDS_TYPES } from '../../../constants';
import Button from '../../../components/Button';

const FieldsForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const { fields } = values;

  const addHandler = () => {
    const field = {
      type: values.type,
      label: values.label,
      name: values.name,
      placeholder: values.placeholder,
      default: values.default,
    };

    setFieldValue('fields', [...fields, field]);
    setFieldValue('type', FIELDS_TYPES[0].value);
    setFieldValue('label', '');
    setFieldValue('name', '');
    setFieldValue('placeholder', '');
    setFieldValue('default', '');
  };

  return (
    <Form className="details__form">
      <div className="details__elems">
        {fields.map(({ type, label, name, placeholder, defaultValue }) => {
          return (
            <div key={name}>
              {name}
              <Input
                type={type}
                label={label}
                field={{ value: defaultValue }}
                placeholder={placeholder}
                form={{ touched: {}, errors: {} }}
              />
            </div>
          );
        })}
      </div>
      <div className="details__fields">
        <Field
          name="type"
          options={FIELDS_TYPES}
          required
          label="Type"
          component={Select}
        />
        <Field name="label" required label="Label" component={Input} />
        <Field name="name" required label="Name" component={Input} />
        <Field name="placeholder" label="Placeholder" component={Input} />
        <Field name="default" label="Default value" component={Input} />
        <Button
          onClick={addHandler}
          additionalClassName="details__add-btn"
          buttonType="button"
        >
          Add
        </Button>
      </div>
      <Button additionalClassName="details__add-btn" buttonType="submit">
        Send
      </Button>
    </Form>
  );
};

export default FieldsForm;
