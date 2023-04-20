import React, { Component } from 'react';
import axios from 'axios';

import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { URL, KEY } from 'utilities/constans';
export class App extends Component {
  state = {
    data: [],
    query: '',
    page: 1,
    LoaderVisible: false,
    buttonStatus: false,
  };
  componentDidUpdate(prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({
        LoaderVisible: true,
      });
      axios
        .get(
          `${URL}key=${KEY}&q=${this.state.query}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.data.hits.length === 0) {
            return;
          }
          this.setState({
            data: [...res.data.hits],
            buttonStatus: true,
          });
        })
        .finally(() =>
          this.setState({
            LoaderVisible: false,
          })
        );
    }
    if (
      prevState.page !== this.state.page &&
      prevState.query === this.state.query
    ) {
      this.setState({
        LoaderVisible: true,
      });
      axios
        .get(
          `${URL}key=${KEY}&q=${this.state.query}&page=${this.state.page}&image_type=photo&orientation=horizontal&per_page=12`
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

  getQueryandResetPage = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  increasePageNumber = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
        data: [...prevState.data],
      };
    });
  };
  render() {
    const { page, data } = this.state;
    return (
      <AppWrapper>
        <Searchbar
          getQueryandResetPage={this.getQueryandResetPage}
          page={page}
        />
        <ImageGallery data={data} />

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
          onLoadMore={() => this.increasePageNumber()}
          showed={this.state.buttonStatus}
        />
      </AppWrapper>
    );
  }
}
