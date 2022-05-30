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
}) => {
  const className = classNames('button', {
    'button--primary': type === 'primary',
    'button--secondary': type === 'secondary',
    'button--outline': type === 'outline',
  });

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
  type: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  kind: PropTypes.oneOf(['button', 'link']),
  buttonType: PropTypes.oneOf(['submit', 'button']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'primary',
  kind: 'button',
  buttonType: 'submit',
  href: null,
  onClick: () => {},
  isLoading: false,
};

export default Button;
