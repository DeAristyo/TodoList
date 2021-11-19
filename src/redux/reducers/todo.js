const init_state = {
    todoList: [],
    inputTodo: "",
    todoCount: 0,
};

export default (state = init_state, action) => {
    switch (action.type) {
        case "INC_TODO_COUNT":
            return { ...state, todoCount: state.todoCount + 1 };
        case "DEC_TODO_COUNT":
            return { ...state, todoCount: state.todoCount - 1 };
        case "CHG_TODO_COUNT":
            return { ...state, todoCount: action.payload };
        case "GET_TODO":
            return { ...state, todoList: action.payload };
        default:
            return state;
    }
};