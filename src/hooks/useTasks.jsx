import { useEffect, useReducer } from "react";
const { VITE_API_URL } = import.meta.env;

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_TASK': {
            return { ...state, tasks: action.payload };
        }

        case 'ADD_TASK': {
            return { ...state, tasks: [...state.tasks, action.payload] };
        }

        case 'REMOVE_TASK': {
            return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };
        }

        case 'UPDATE_TASK': {
            return { ...state, tasks: state.tasks.map((task) => task.id === action.payload.id ? { ...task, ...action.payload } : task) };
        }

        default:
            return state;
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

const removeTask = async (taskId, dispatch) => {
    try {
        const response = await fetch(`${VITE_API_URL}/${taskId}`, { method: 'DELETE' });
        const { success, message } = await response.json();

        if (!success) throw new Error(message);

        dispatch({ type: 'REMOVE_TASK', id: taskId });
    } catch (err) { console.error(err.message) }
}

const updateTask = async (taskId, updatedTask, dispatch) => {
    try {
        const response = await fetch(`${VITE_API_URL}/${taskId}`, { 
            method: 'PUT',
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(updatedTask),
        });
        const { success, message, task } = await response.json();

        if (!success) throw new Error(message);

        dispatch({ type: 'UPDATE_TASK', payload: task});
    } catch (err) { console.error(err.message) }
}

const fetchTasks = async (dispatch) => {
    try {
        const response = await fetch(`${VITE_API_URL}`);
        const data = await response.json();
        dispatch({ type: 'GET_TASK', payload: data });
    } catch (error) {
        console.error(error);
    }
}

function useTasks() {
    const [state, dispatch] = useReducer(reducer, { tasks: [] });

    useEffect(() => {
        fetchTasks(dispatch)
    }, []);

    return {
        ...state,
        addTask: (newTask) => addTask(newTask, dispatch),
        removeTask: (task) => removeTask(task, dispatch),
        updateTask: (taskId, updatedTask) => updateTask(taskId, updatedTask, dispatch),
    }
}

export default useTasks;