import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import NoteForm from './Form';
import Modal from './Modal/Modal';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      error: {},
    }
  }

  updateData = (data) => {
    this.setState({data})
  }

  handleAddNote = () => {
    let { error } = this.state;
    error = {};
    if (!this.state.data.title || !this.state.data.text) {
      if (!this.state.data.title) {
        error.title = 'Campo deve ser preenchido.'
      }
      if (!this.state.data.text) {
        error.text = 'Campo deve ser preenchido.'
      }

    } else {
      axios.post(`//localhost:3003/api/notes`, 
        this.state.data,
      )
      .then(({data}) => {
        // console.log(response);
        this.props.handleCloseButton(() => {
          this.props.getData();
          this.props.history.push(`/notes/${data._id}`)
        });
      })
      .catch((response) => {
        console.log(response);
      });
    }
    this.setState({ error });
  }

  render() {
    const {
      isLoading,
    } = this.state;
    return (
      <React.Fragment>
        {!isLoading &&
          <React.Fragment>
            <Modal
            funcSubmit={this.handleAddNote}
            funcCancel={this.props.handleCloseButton}
            labelSubmit="Adicionar"
            labelCancel="Cancelar"
            >
              <NoteForm
                note={this.state.data}
                updateData={this.updateData}
                error={this.state.error}
              />
            </Modal>
          </React.Fragment>
          }
        
      </React.Fragment>
    );
  }
};

Edit.propTypes = {
  id: PropTypes.string,
  handleCloseButton: PropTypes.func,
  getData: PropTypes.func,
};

export default withRouter(Edit);
