import { useEffect, useReducer } from "react";
const { VITE_API_URL } = import.meta.env

const reducer = (action, state) => {
    switch (action.type) {
        case 'GET_TASK':
            return { ...state, tasks: action.payload }

        case '':
        default:
            return state
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
    const [state, dispatch] = useReducer(reducer, {tasks: []});

    useEffect(() => {
        fetchTasks(dispatch)
    }, []);

   
    return state
}

export default useTasks;