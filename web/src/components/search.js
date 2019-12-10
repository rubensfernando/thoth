import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends Component {
  handleChange = ({ target }) => {
    if (target.value.length > 2) {
      console.log('you', target.value);
      this.props.getData(target.value);
    } else {
      this.props.getData();
    }
  }

  render() {
    return(
      <form>
        <div className="search">
          <i></i>
          <input
            placeholder="pequisar"
            onChange={this.handleChange}
          />
        </div>
      </form> 
    );
  }
};

SearchForm.propTypes = {
  getData: PropTypes.func.isRequired,
};

