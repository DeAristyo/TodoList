import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import TodoItems from '../components/todoItems';
import React from 'react';
import Axios from 'axios';
import ReactModal from 'react-modal';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeTodoCount, decrementTodoCount, incrementTodoCount, fetchGTodo } from '../redux/actions/todo';
import { API } from '../Constants/API';

class TodoPage extends React.Component {

  state = {
    todoList: [],
    inputTodo: "",
    alertState: false,
    alertMessage: ""
  };

  openAlert = (state) => {
    this.setState({ alertState: true, alertMessage: state });
  };

  renderTodoLis = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <ul>
          <li>
            <TodoItems
              completeTodoHandler={this.completeTodo}
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
        this.openAlert("To Do Completed");
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
        this.openAlert("To Do Deleted!!");
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

  render() {
    return (
      <div className="todo-container">
        {this.state.alertState === true && this.state.alertMessage === "To Do Completed" ?
          (<Alert variant="success" onClose={() => this.setState({ alertState: false })} dismissible>
            <strong>{this.state.alertMessage}</strong>
          </Alert>)
          : this.state.alertState === true && this.state.alertMessage === "To Do Deleted!!" ?
            (<Alert variant="danger" onClose={() => this.setState({ alertState: false })} dismissible>
              <strong>{this.state.alertMessage}</strong>
            </Alert>) : null
        }
        <div className="list-todo d-flex flex-column justify-content-center align-items-center">
          <h1>To Do list</h1>
          {this.renderTodoLis()}
          <div>
            <input value={this.state.inputTodo} onKeyDown={this.handleAddTodo} onChange={(e) => this.inputHandler(e)} type="text" className="input-todo mx-3" placeholder="Create To Do" />
            <button onClick={this.addTodo} className="btn-add">Add To Do</button>
          </div>
        </div>
      </div >
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