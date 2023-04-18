import React, { Component } from 'react';

import { AppWrapper } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  state = {
    query: '',
  };

  getDataFromFetch = query => {
    this.setState({
      query: query,
    });
  };

  render() {
    return (
      <AppWrapper>
        <Searchbar getDataFromFetch={this.getDataFromFetch} />
        <ImageGallery query={this.state.query} />
      </AppWrapper>
    );
  }
}
