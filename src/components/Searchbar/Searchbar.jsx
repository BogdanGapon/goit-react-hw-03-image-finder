import React, { Component } from 'react';
import {
  HeaderSearchbar,
  Form,
  SearchInput,
  SearchFormButton,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    getQueryandResetPage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
  };
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
    const { getQueryandResetPage } = this.props;
    const { query } = this.state;
    if (query.trim() === '') {
      return;
    }
    getQueryandResetPage(query);
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
