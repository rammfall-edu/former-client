import React from 'react';

const Select = ({
  field: { name, value, onChange, onBlur },
  form,
  label,
  required,
  placeholder,
  options,
}) => {
  const error = form.touched[name] && form.errors[name];

  return (
    <label className="input">
      <span className="input__label">
        {label}
        {required && ' *'}
      </span>
      <select
        className="input__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <span className="input__message">{form.errors[name]}</span>}
    </label>
  );
};

Select.defaultProps = {
  options: [],
};

export default Select;
