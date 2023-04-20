import { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  static propTypes = {
    data: PropTypes.array,
  };
  state = {
    largePhoto: null,
    showModal: false,
  };

  closeModal = evt => {
    this.setState({
      showModal: false,
    });
  };

  getLargePhoto = largePhoto => {
    this.setState({
      largePhoto,
      showModal: true,
    });
  };
  render() {
    const { data } = this.props;
    return (
      <>
        <ImageList>
          <ImageGalleryItem data={data} getLargePhoto={this.getLargePhoto} />
        </ImageList>
        {this.state.showModal && (
          <Modal onCloseModal={this.closeModal}>
            <img src={this.state.largePhoto} alt={this.state.query} />
          </Modal>
        )}
      </>
    );
  }
}
