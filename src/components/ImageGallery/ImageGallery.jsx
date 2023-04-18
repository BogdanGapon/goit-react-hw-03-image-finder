import { Component } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ImageList } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
export class ImageGallery extends Component {
  state = {
    data: [],
    page: 1,
    buttonStatus: false,
    LoaderVisible: false,
    largePhoto: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const URL = 'https://pixabay.com/api/?';
    const KEY = '33797710-c43b349e33488e785e99b8ec8';

    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        LoaderVisible: true,
      });
      axios
        .get(
          `${URL}key=${KEY}&q=${this.props.query}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return;
          }
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...res.data.hits],
              buttonStatus: true,
            };
          });
        })
        .finally(() =>
          this.setState({
            LoaderVisible: false,
          })
        );
    }
  }
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

  increaseNumberOfPage() {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  }
  render() {
    const { data } = this.state;
    return (
      <>
        <ImageList>
          <ImageGalleryItem data={data} getLargePhoto={this.getLargePhoto} />
        </ImageList>
        {this.state.showModal && (
          <Modal onCloseModal={this.closeModal}>
            <img src={this.state.largePhoto} alt="" />
          </Modal>
        )}
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            margin: `0 auto`,
          }}
          wrapperClassName=""
          visible={this.state.LoaderVisible}
        />
        <Button
          onLoadMore={() => this.increaseNumberOfPage()}
          showed={this.state.buttonStatus}
        />
      </>
    );
  }
}
