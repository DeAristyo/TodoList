import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoItems from '../components/todoItems';
import React from 'react';
import Axios from 'axios';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { changeTodoCount, decrementTodoCount, incrementTodoCount, fetchGTodo } from '../redux/actions/todo';
import { API } from '../Constants/API';

class TodoPage extends React.Component {

  state = {
    todoList: [],
    inputTodo: "",
    openModal: false,
    modalMasage: ""
  };

  funOpenModal = (state) => {
    this.setState({ openModal: true, modalMasage: state });
  };

  closeModal = () => {
    this.setState({ openModal: false, modalMasage: "" });
  };

  renderTodoLis = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <ul>
          <li>
            <TodoItems
              comTodoHandler={this.completeTodo}
              delTodoHandler={this.deleteTodo}
              todoData={val} />
          </li>
        </ul>
      );
    });
  };

  completeTodo = (id) => {
    Axios.patch(`${API}/todo/${id}`, {
      isFinished: true
    })
      .then(() => {
        this.props.fetchGTodo();
        this.funOpenModal("To Do Completed");
      })
      .catch((err) => {
        alert("There's an error in the system!");
      });
  };

  addTodo = () => {
    Axios.post(`${API}/todo`, {
      activity: this.state.inputTodo,
      isFinished: false
    })
      .then(() => {
        // alert("To Do Added");
        this.funOpenModal("To Do Added");
        this.props.fetchGTodo();
        this.setState({ inputTodo: "" });
      })
      .catch((err) => {
        console.log(err);
        alert("There's an error in the system!");
      });
  };

  handleAddTodo = (event) => {
    console.log(event);
    if (event.keyCode === 13) {
      this.addTodo();
    }
  };

  deleteTodo = (id) => {
    Axios.delete(`${API}/todo/${id}`)
      .then(() => {
        this.props.fetchGTodo();
        this.funOpenModal("To Do Deleted");
      })
      .catch((err) => {
        console.log(err);
        alert("There's an error in the system!");
      });
  };

  inputHandler = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  componentDidMount() {
    this.props.fetchGTodo();
  }

  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      borderRadius: '30%',
      transform: 'translate(-50%, -50%)',
    }
  };

  render() {
    return (
      <div className="todo-container">
        <ReactModal
          style={this.customStyles}
          onRequestClose={this.closeModal}
          isOpen={this.state.openModal}
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
        >
          <h1>{this.state.modalMasage}</h1>

        </ReactModal>
        <div className="list-todo d-flex flex-column justify-content-center align-items-center">
          <h1>To Do list</h1>
          {this.renderTodoLis()}
          <div>
            <input value={this.state.inputTodo} onKeyDown={this.handleAddTodo} onChange={(e) => this.inputHandler(e)} type="text" className="mx-3" placeholder="Create To Do" />
            <button onClick={this.addTodo} className="btn-add">Add To Do</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    testingProps: 0,
    todoGlobalState: state.todo,
  };
};

const mapDispatchToProps = {
  incrementTodoCount, decrementTodoCount, changeTodoCount, fetchGTodo,
};

export default connect(mapStateProps, mapDispatchToProps)(TodoPage);