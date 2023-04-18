import { Img, ImageItem } from './ImageGalleryItem.styled';
import { Component } from 'react';
export class ImageGalleryItem extends Component {
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
