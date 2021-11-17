import React from 'react';

class TodoItems extends React.Component {

    render() {
        return (
            <div className="d-flex flex-row justify-content-between todo-item-container align-items-center">
                {this.props.todoData.activity}
                <div>
                    <button onClick={() => this.props.delTodoHandler(this.props.todoData.id)} className="btn-delete mx-2">Delete</button>
                    <button
                        disabled={this.props.todoData.isFinished}
                        onClick={() => this.props.comTodoHandler(this.props.todoData.id)}
                        className="btn-complete">
                        {this.props.todoData.isFinished ? <em className="mx-1">Finished</em> : "Complete"}
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoItems;