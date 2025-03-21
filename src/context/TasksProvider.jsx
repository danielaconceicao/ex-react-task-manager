import TaskContext from './TasksContext'
import useTasks from '../hooks/useTasks';

export default function TasksProvider({ children }) {

    const {tasks} = useTasks();


    const values = {
        tasks,
    }


    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}