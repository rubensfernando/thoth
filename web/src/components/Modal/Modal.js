import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  onClose = e => {
    this.props.funcCancel && this.props.funcCancel(e);
  };
  onSubmit = e => {
    this.props.funcSubmit && this.props.funcSubmit(e);
  };

  render() {
    return (
      <div className="modal__wrapper">
        <div className="modal" id="modal">
          <div className="modal__content">
            {this.props.children}
          </div>
          <div className="actions">
            <button className="button button__secondary" onClick={this.onClose}>
              {this.props.labelCancel}
            </button>
            <button className="button button__primary" onClick={this.onSubmit}>
              {this.props.labelSubmit}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

Modal.propTypes = {
  funcSubmit: PropTypes.func.isRequired,
  funcCancel: PropTypes.func.isRequired,
  labelSubmit: PropTypes.string,
  labelCancel: PropTypes.string,
};

