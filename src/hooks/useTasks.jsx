import { useEffect, useReducer } from "react";
const { VITE_API_URL } = import.meta.env

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASK': {
            return { ...state, tasks: action.payload }
        }

        case 'ADD_TASK': {
            return { ...state, tasks: [...state.tasks, action.payload] }
        }

        default:
            return state
    }
}

const addTask = async (newTask, dispatch) => {
    try {

        const response = await fetch(VITE_API_URL, {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(newTask),
        });

        const data = await response.json();
        console.log(data)

        if (!data.success) {
            throw new Error(data.message);
        }

        dispatch({ type: 'ADD_TASK', payload: data.task });

    } catch (error) {
        console.error('Error adding task', error);
        return false;
    }
}

const fetchTasks = async (dispatch) => {
    try {
        const response = await fetch(`${VITE_API_URL}`)
        const data = await response.json()
        dispatch({ type: 'GET_TASK', payload: data })
    } catch (error) {
        console.error(error)
    }
}

function useTasks() {
    const [state, dispatch] = useReducer(reducer, { tasks: [] });

    useEffect(() => {
        fetchTasks(dispatch)
    }, []);

    return { ...state, addTask: (newTask) => addTask(newTask, dispatch) }
}

export default useTasks;