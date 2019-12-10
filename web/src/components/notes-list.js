import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


export default class NoteList extends Component {
  render() {
    return(
      <div className="notes">
        {this.props.notes.map((n, i) => {
          return (<NavLink key={n._id} className="notes__item" to={`/notes/${n._id}`}>
            <div className="notes__inner">
              <h2>{n.title}</h2>

              {n.text ? <p>{n.text.substr(0, 76)}</p> : null}
              <p className="notes__date">{n.date}</p>
            </div>
          </NavLink>);
        })}
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};
