import React from 'react';

class TodoItems extends React.Component {

    deleteBtnHandler() {
        alert('Anda memencet button DELETE');
    }

    btnHandler(type) {
        alert(`Anda memencet button ${type}`);
    }

    render() {
        return (
            <div className="d-flex flex-row justify-content-between todo-item-container align-items-center">
                {this.props.todoData.id}. {this.props.todoData.activity}
                <div>
                    <button onClick={() => this.props.delTodoHandler(this.props.todoData.id)} className="btn btn-danger">Delete</button>
                    <button
                        disabled={this.props.todoData.isFinished}
                        onClick={() => this.props.comTodoHandler(this.props.todoData.id)}
                        className="btn btn-success">
                        {this.props.todoData.isFinished ? <em className="mx-1">Finished</em> : "Complete"}
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoItems;