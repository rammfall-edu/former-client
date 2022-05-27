import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './button.scss';

const Button = ({ children, type, kind, href, buttonType }) => {
  const className = classNames('button', {
    'button--primary': type === 'primary',
    'button--secondary': type === 'secondary',
    'button--outline': type === 'outline',
  });

  if (kind === 'button') {
    return (
      <button type={buttonType} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link className={className} to={href}>
      {children}
    </Link>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  kind: PropTypes.oneOf(['button', 'link']),
  buttonType: PropTypes.oneOf(['submit', 'button']),
  href: PropTypes.string,
};

Button.defaultProps = {
  type: 'primary',
  kind: 'button',
  buttonType: 'submit',
  href: null,
};

export default Button;
