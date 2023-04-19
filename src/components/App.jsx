import React, { Component } from 'react';

import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  resetPageAndgetDataFromFetch = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  increasePageNumber = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };
  render() {
    const { page, query } = this.state;
    return (
      <AppWrapper>
        <Searchbar
          resetPageAndgetDataFromFetch={this.resetPageAndgetDataFromFetch}
          page={page}
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
