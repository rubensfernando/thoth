import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { NavLink } from 'react-router-dom';


export default class NoteList extends Component {
  render() {
    return(
      <div className="notes">
        {this.props.notes.map((n, i) => {
          return (<NavLink key={n._id} className="notes__item" to={`/notes/${n._id}`} onClick={this.props.clickSelect}>
            <div className="notes__inner">
              {n.title ? <h2>{n.title}</h2> : <h2 className="muted">Sem título</h2>}
              {n.text ? <p>{n.text.substr(0, 76)}</p> : null}
              <p className="notes__date"><p>{moment(n.date).format('DD/MM/YY')}</p></p>
            </div>
          </NavLink>);
        })}
      </div>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  clickSelect: PropTypes.func.isRequired,
};
