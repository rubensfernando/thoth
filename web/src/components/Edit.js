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
      isLoading: true,
    }
  }

  componentDidMount() {
    console.log('edit', this.props.id);
    axios.get(`//localhost:3003/api/notes/${this.props.id}`)
      .then(({ data }) => {
        this.setState({
          isLoading: false,
          data,
          id: this.props.id,
        })
      });
  }
  updateData = (data) => {
    this.setState({data})
  }

  handleUpdateNote = () => {
    axios.put(`//localhost:3003/api/notes/${this.props.id}`, 
      this.state.data,
    )
    .then((response) => {
      console.log(response);
      this.props.handleCloseButton(() => {
        this.props.getData();
        this.props.history.push(`/notes/${this.props.id}`)
      });
    })
    .catch((response) => {
      console.log(response);
    });
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
            funcSubmit={this.handleUpdateNote}
            funcCancel={this.props.handleCloseButton}
            labelSubmit="Salvar"
            labelCancel="Cancelar"
            >
              <NoteForm
                note={this.state.data}
                updateData={this.updateData}
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
