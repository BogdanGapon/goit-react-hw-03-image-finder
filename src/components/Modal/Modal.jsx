import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
  };
  handleCloseModalByEscape = evt => {
    const { onCloseModal } = this.props;
    if (evt.code === 'Escape') {
      onCloseModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEscape);
  }
  handleCloseModalClick = evt => {
    const { onCloseModal } = this.props;
    if (evt.currentTarget === evt.target) {
      onCloseModal();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleCloseModalClick}>
        <ModalWindow>{this.props.children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
