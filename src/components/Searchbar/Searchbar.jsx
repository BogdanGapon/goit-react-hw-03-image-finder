import React, { Component } from 'react';
import {
  HeaderSearchbar,
  Form,
  SearchInput,
  SearchFormButton,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({
      [name]: value.toLocaleString(),
    });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    const { getDataFromFetch } = this.props;
    const { query } = this.state;
    if (this.state.query.trim() === '') {
      return;
    }
    getDataFromFetch(query);
    this.resetState();
  };

  resetState = () => {
    this.setState({
      query: '',
    });
  };
  render() {
    return (
      <HeaderSearchbar>
        <Form onSubmit={this.handleFormSubmit}>
          <SearchFormButton type="submit">Search</SearchFormButton>

          <SearchInput
            onChange={this.handleInputChange}
            type="text"
            name="query"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </HeaderSearchbar>
    );
  }
}
