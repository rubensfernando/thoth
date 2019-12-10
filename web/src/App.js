import React, { Component } from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";

import './scss/App.scss';
import LaunchScreen from './LaunchScreen';
import NoteList from './components/notes-list';
import SearchForm from './components/search';
import NotesContent from './components/notes-content';
import Edit from './components/Edit';
import Add from './components/Add';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      addModal: {
        open: false,
      },
      editModal: {
        open: false,
      },
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async (termSearch) => {
    await axios.get(`//localhost:3003/api/notes`)
      .then(({ data }) => {
        console.log('response', data);
        this.setState({
          notes: data.notes,
          isLoading: false,
        })
      })
  }

  handleOpenEditModal = (id) => {
    this.setState({
      editModal: {
        open: true,
        id,
      }
    });
  }

  handleCloseEditModal = (callback) => {
    this.setState({
      editModal: {
        open: false,
        id: '',
      }
    },() => {
      if(callback && typeof callback === 'function') {
        callback();
      }
    });
  }

  handleOpenAddModal = () => {
    this.setState({
      addModal: {
        open: true,
      }
    });
  }

  handleCloseAddModal = (callback) => {
    this.setState({
      addModal: {
        open: false,
      }
    }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
    });
  }

  render() {
    const {
      isLoading,
      addModal,
      editModal,
      notes,
    } = this.state;
    return (
      <div className="root">
        {isLoading && <LaunchScreen />}
        {!isLoading &&
          <div className="wrapper">
            <div className="sidebar">
              <div className="header">
                <SearchForm getData={this.getData} />
                <button
                className="button button__add button__primary large"
                  onClick={this.handleOpenAddModal}
                >
                  <i className="icon plus"></i>
                  Adicionar
                </button>
              </div>
              <NoteList notes={notes} />
            </div>
          <div className="content">
            <Route path="/notes/:id">
              <NotesContent
                funcOpenEdit={this.handleOpenEditModal}
              />
            </Route>
          </div>
          </div>}
        {editModal.open &&
          <Edit
            id={editModal.id}
            handleCloseButton={this.handleCloseEditModal}
            getData={this.getData}
          />
          }
        {addModal.open &&
          <Add
            handleCloseButton={this.handleCloseAddModal}
            getData={this.getData}
          />
          }
      </div>
    );
  }
}

export default App;
