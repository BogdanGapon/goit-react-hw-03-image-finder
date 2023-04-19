import { Component } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { ImageList } from './ImageGallery.styled';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { URL, KEY } from 'utilities/constans';
import PropTypes from 'prop-types';
export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string,
    page: PropTypes.number,
    increasePageNumber: PropTypes.func,
  };
  state = {
    data: [],
    buttonStatus: false,
    LoaderVisible: false,
    largePhoto: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState(prevState => {
        return {
          LoaderVisible: true,
        };
      });
      axios
        .get(
          `${URL}key=${KEY}&q=${this.props.query}&page=${this.props.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return;
          }
          this.setState(prevState => {
            return {
              data: [...res.data.hits],
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
    if (
      prevProps.page !== this.props.page &&
      prevProps.query === this.props.query
    ) {
      this.setState({
        LoaderVisible: true,
      });
      axios
        .get(
          `${URL}key=${KEY}&q=${this.props.query}&page=${this.props.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return;
          }
          this.setState(prevState => {
            return {
              data: [...prevState.data, ...res.data.hits],
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
    this.props.increasePageNumber();
    this.setState(prevState => {
      return {
        data: [...prevState.data],
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
            <img src={this.state.largePhoto} alt={this.props.query} />
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
