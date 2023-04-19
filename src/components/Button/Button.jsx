import { Component } from 'react';
import { LoadMoreButton } from './Button.styled';
import PropTypes from 'prop-types';
export class Button extends Component {
  static propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    showed: PropTypes.bool.isRequired,
  };
  handleIncreaseAmountOfPage = evt => {
    this.props.onLoadMore();
  };
  render() {
    const { showed } = this.props;
    return (
      showed && (
        <LoadMoreButton type="button" onClick={this.handleIncreaseAmountOfPage}>
          Load more
        </LoadMoreButton>
      )
    );
  }
}
