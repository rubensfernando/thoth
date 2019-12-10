import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './scss/App.scss';
import LaunchScreen from './LaunchScreen';
import NoteList from './components/notes-list';
import SearchForm from './components/search';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
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

  render() {
    const {
      isLoading,
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
              </div>
              <NoteList notes={notes} />
            </div>
          <div className="content">
              as anotações
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
