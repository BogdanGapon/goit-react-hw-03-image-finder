import { Component } from 'react';
import { LoadMoreButton } from './Button.styled';
export class Button extends Component {
  handleIncreaseAmountOfPage = evt => {
    this.props.onLoadMore();
  };
  render() {
    return (
      <LoadMoreButton
        type="button"
        showed={this.props.showed}
        onClick={this.handleIncreaseAmountOfPage}
      >
        Load more
      </LoadMoreButton>
    );
  }
}
