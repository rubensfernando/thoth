import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  date: new Date(),
  title: '',
  type: '',
  place: '',
  text: '',
  latLng: {
    lat: 0,
    lng: 0,
  },
};

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    if (this.props.note) {
      this.setState(this.props.note);
    }
  }

  setDate = (date) => {
    this.setState({ date }, () => this.props.updateData(this.state));
  }

  handleChange = (name) => (event) => {
    const { value } = event.target;
    // console.log('change', name)
    if (name === 'lat' || name === 'lng') {
      const state = this.state;
      state.latLng[name] = value;
      this.setState(state, () => this.props.updateData(this.state));
    } else {
      this.setState({ [name]: value }, () => this.props.updateData(this.state));
    }
  }

  changeType = (event) => {
    console.log('event', event);
  } 

  render() {
    return(
      <div className="form">
        <div className="form__group">
          <label className="form__label">Tipo</label>
          <select
            className="form__type"
            onChange={this.handleChange('type')}
            value={this.state.type}
          >
            <option defaultValue>Escolha uma categoria</option>
            <option>Descoberta</option>
            <option>Anotação</option>
          </select>
        </div>
        <div className="form__group">
          <input
            className="form__title"
            placeholder={this.state.type === 'Descoberta' ? 'O que você encontrou?' : 'Coloque o título aqui'}
            value={this.state.title}
            onChange={this.handleChange('title')} 
          />
        </div>
        <div className="form__second">
          <div className="form__group">
            <label className="form__label">Data e hora</label>
            <DatePicker
              selected={moment(this.state.date).toDate()}
              onChange={date => this.setDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Horário"
              dateFormat="dd/MM/yyyy - HH:mm"
              className="form__date"
            />
          </div>
          <div className="form__group">
            <label className="form__label">{this.state.type === 'Descoberta' ? 'Onde encontrou?' : 'Local'}</label>
            <input
              className="form__place"
              placeholder="Local"
              value={this.state.place}
              onChange={this.handleChange('place')} 
          />
          </div>
        </div>
        
        <div className="form__group">
          <label className="form__label">{this.state.type === 'Descoberta' ? 'Como era?' : 'Anotações'}</label>
          <textarea
            className="form__text"
            placeholder="Digite aqui..."
            value={this.state.text}
            onChange={this.handleChange('text')} 
          />
        </div>
        
      </div> 
    );
  }
};

NoteForm.propTypes = {
  updateData: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

