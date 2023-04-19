import { Img, ImageItem } from './ImageGalleryItem.styled';
import { Component } from 'react';
import PropTypes from 'prop-types';
export class ImageGalleryItem extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    getLargePhoto: PropTypes.func.isRequired,
  };
  foundPhoto = largeImageURL => {
    this.props.getLargePhoto(largeImageURL);
  };
  render() {
    const { data } = this.props;
    return data.map(data => {
      const { id, webformatURL, tags, largeImageURL } = data;
      return (
        <ImageItem key={id}>
          <Img
            src={webformatURL}
            alt={tags}
            onClick={() => this.foundPhoto(largeImageURL)}
          />
        </ImageItem>
      );
    });
  }
}
