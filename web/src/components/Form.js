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

  render() {
    return(
      <div className="form">
        <div>
          <input
            className="form__title"
            placeholder="Coloque o título aqui"
            value={this.state.title}
            onChange={this.handleChange('title')} 
          />
        </div>
        <div>
          <i className="icon calendar" />
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
        <div>
          <i className="icon calendar" />
          <input
            className="form__type"
            placeholder="Coloque o título aqui"
            value={this.state.type}
            onChange={this.handleChange('type')} 
        />
        </div>
        <div>
          <i className="icon calendar" />
          <select className="form__type">
            <option></option>
            <option>Descoberta</option>
            <option>Anotação</option>
          </select>
        </div>
        <div>
          <i className="icon calendar" />
          <input
            className="form__lat"
            placeholder="Coloque o título aqui"
            value={this.state.latLng.lat}
            onChange={this.handleChange('lat')} 
          />
        </div>
        <div>
          <i className="icon calendar" />
          <input
            className="form__lng"
            placeholder="Coloque o título aqui"
            value={this.state.latLng.lng}
            onChange={this.handleChange('lng')} 
          />
        </div>
        <div>
          <textarea
            className="form__text"
            placeholder="Digite o texto aqui..."
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

