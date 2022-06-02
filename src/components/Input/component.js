import React, { useState } from 'react';
import classNames from 'classnames';

import './input.scss';

const Input = ({
  field: { name, value, onChange, onBlur },
  form,
  label,
  required,
  type,
  placeholder,
}) => {
  const error = form.touched[name] && form.errors[name];
  const [hidden, setHidden] = useState(type);

  const handleHidden = () => {
    setHidden((prevState) => (prevState === 'password' ? 'text' : 'password'));
  };

  return (
    <label className="input">
      <span className="input__label">
        {label}
        {required && ' *'}
      </span>
      <input
        checked={type === 'checkbox' ? value : null}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('input__input', error && 'input__input--error')}
        type={hidden}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <button type="button" onClick={handleHidden} className="input__button">
          👁
        </button>
      )}
      {error && <span className="input__message">{form.errors[name]}</span>}
    </label>
  );
};

export default Input;
