import TaskContext from './TasksContext'
import useTasks from '../hooks/useTasks';

export default function TasksProvider({ children }) {

    const {tasks, addTask} = useTasks();


    const values = {
        tasks,
        addTask
    }


    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}