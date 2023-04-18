import React, { Component } from 'react';

import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  getDataFromFetch = query => {
    this.setState({
      query,
    });
  };

  increasePageNumber = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  resetPageNumber = () => {
    this.setState({
      page: 1,
    });
  };
  render() {
    const { page, query } = this.state;
    return (
      <AppWrapper>
        <Searchbar
          getDataFromFetch={this.getDataFromFetch}
          page={page}
          resetPageNumber={this.resetPageNumber}
        />
        <ImageGallery
          query={query}
          page={page}
          increasePageNumber={this.increasePageNumber}
        />
      </AppWrapper>
    );
  }
}
