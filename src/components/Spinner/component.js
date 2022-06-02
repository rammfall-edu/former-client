import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './spinner.scss';

const Spinner = ({ theme }) => (
  <div
    className={classNames('lds-ellipsis', {
      'lds-ellipsis--dark': theme === 'dark',
    })}
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

Spinner.propTypes = {
  theme: PropTypes.oneOf(['dark', 'light']),
};

Spinner.defaultProps = {
  theme: 'light',
};

export default Spinner;
