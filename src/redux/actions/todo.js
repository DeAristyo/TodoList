import Axios from "axios";
import { API } from "../../Constants/API";

export const incrementTodoCount = () => {
    return {
        type: "INC_TODO_COUNT"
    };
};

export const decrementTodoCount = () => {
    return {
        type: "DEC_TODO_COUNT"
    };
};

export const changeTodoCount = (newCount) => {
    return {
        type: "CHG_TODO_COUNT",
        payload: newCount
    };
};

export const fetchGTodo = () => {
    return (dispatch) => {
        Axios.get(`${API}/todo`)
            .then((list) => {
                console.log(list.data);
                dispatch({
                    type: "GET_TODO",
                    payload: list.data
                });

                dispatch({
                    type: "CHG_TODO_COUNT",
                    payload: list.data.length,
                });
            })
            .catch((err) => {
                alert("There's an error in the system!");
            });
    };
};