import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';
const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  handleCloseModalByEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModalByEscape);
  }
  handleCloseModalClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
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
