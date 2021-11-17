import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoItems from '../components/todoItems';
import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { changeTodoCount, decrementTodoCount, incrementTodoCount, fetchGTodo } from '../redux/actions/todo';
import { API } from '../Constants/API';

class TodoPage extends React.Component {

  state = {
    todoList: [],
    inputTodo: ""
  };

  deleteModal = () => {
    return (
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">Delete To Do</div>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>To Do Deleted</p>
            </div>
          </div>
        </div>
      </div>
    );
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
        alert("To Do Completed!");
        this.props.fetchGTodo();
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
        alert("To Do Added");
        this.props.fetchGTodo();
      })
      .catch((err) => {
        alert("There's an error in the system!");
      });
  };

  deleteTodo = (id) => {
    Axios.delete(`${API}/todo/${id}`)
      .then(() => {
        alert("To Do Deleted");
        this.props.fetchGTodo();
      })
      .catch((err) => {
        alert("There's an error in the system!");
      });
  };

  inputHandler = (e) => {
    this.setState({ inputTodo: e.target.value });
  };

  componentDidMount() {
    this.props.fetchGTodo();
  }

  render() {
    return (
      <div className="todo-container">
        <div className="list-todo d-flex flex-column justify-content-center align-items-center">
          <h1>To Do list</h1>
          {/* <button onClick={this.fetchTodo} className="btn btn-info">Show To Do {this.props.todoGlobalState.todoCount}</button> */}
          {this.renderTodoLis()}
          <div>
            <input onChange={(e) => this.inputHandler(e)} type="text" className="mx-3" placeholder="Create To Do" />
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