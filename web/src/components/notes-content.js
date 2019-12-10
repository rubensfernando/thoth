import React, {Component} from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import axios from "axios";
import moment from "moment";


class NotesContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {}
    };
  }

  loadNote = () => {
    axios.get(`//localhost:3003/api/notes/${this.props.match.params.id}`)
      .then(({data}) => {
        this.setState({
          isLoading: false,
          data,
          id: this.props.match.params.id,
        })
      });
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log(nextProps.match.params.id, this.props.match.params.id);
  //   return nextProps.match.params.id !== this.props.match.params.id;
  // }

  componentDidMount() {
    this.loadNote()
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.id) {
      this.loadNote();
    }
  }

  handleEditClick = (id) => {
    this.props.funcOpenEdit(id);
  }

  handleDeteClick = (id) => {
    console.log('editar');
  }

  render() {
    const {
      data,
    } = this.state;
    if (this.state.isLoading) {
      return (<div>carregando...</div>)
    }
    return(
      <div className="note-show">
        <header>
          <h1>{data.title}</h1>
          <div className="toolbar">
            <p>{moment(data.date).format('DD/MM/YY')}</p>
            <div className="toolbar__actions">
              <button onClick={() => this.handleEditClick(this.props.match.params.id) }><i></i> Editar</button>
              <button onClick={this.handleDeleteClick}><i></i> Excluir</button>
            </div>
          </div>
        </header>
        <div className="text">
          {data.text.split('\n').map((item, key) => {
            return <p key={key}>{item}<br /></p>
          })}
        </div>
      </div>
    );
  }
};

NotesContent.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  funcOpenEdit: PropTypes.func.isRequired,
};

export default withRouter(NotesContent);
