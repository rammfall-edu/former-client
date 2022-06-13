import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './button.scss';
import Spinner from '../Spinner';

const Button = ({
  children,
  type,
  kind,
  href,
  buttonType,
  onClick,
  isLoading,
  additionalClassName,
  size,
}) => {
  const className = classNames(
    'button',
    additionalClassName,
    `button--${size}`,
    {
      'button--primary': type === 'primary',
      'button--secondary': type === 'secondary',
      'button--outline': type === 'outline',
      'button--accent': type === 'accent',
    }
  );

  if (kind === 'button') {
    return (
      <button
        disabled={isLoading}
        onClick={onClick}
        type={buttonType}
        className={className}
      >
        {isLoading ? <Spinner /> : children}
      </button>
    );
  }

  return (
    <Link className={className} to={href}>
      {isLoading ? <Spinner /> : children}
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'outline', 'accent']),
  kind: PropTypes.oneOf(['button', 'link']),
  buttonType: PropTypes.oneOf(['submit', 'button']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'md', 'sm']),
  additionalClassName: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  kind: 'button',
  buttonType: 'submit',
  href: null,
  onClick: () => {},
  isLoading: false,
  size: 'lg',
  additionalClassName: '',
};

export default Button;
