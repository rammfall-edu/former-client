import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import Button from '../Button';

const Modal = ({ children, title, handleClose, handleConfirm, type }) => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__cross" onClick={handleClose}>
            ⨯
          </button>
        </div>
        {children && <div className="modal__body">{children}</div>}
        <div className="modal__footer">
          <Button
            onClick={handleConfirm}
            type={type === 'danger' ? 'accent' : 'primary'}
          >
            Confirm
          </Button>
          <Button buttonType="button" type="outline" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['danger', 'standard']),
};

Modal.defaultProps = {
  children: null,
  type: 'standard',
};

export default Modal;
