import React from "react";
import { connect } from "react-redux";

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav-container d-flex flex-row justify-content-between align-items-center">
                <h5>To Do List App</h5>
                <h5>You have {this.props.todoGlobalState.todoCount} todo Item(s)</h5>
            </div>
        );
    }
}

const mapStateProps = (state) => {
    return {
        todoGlobalState: state.todo,
    };
};

export default connect(mapStateProps)(Navbar);