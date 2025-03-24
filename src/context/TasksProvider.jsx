import TaskContext from './TasksContext'
import useTasks from '../hooks/useTasks';

export default function TasksProvider({ children }) {

    const { tasks, addTask, removeTask } = useTasks();

    const values = {
        tasks,
        addTask,
        removeTask
    }


    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}