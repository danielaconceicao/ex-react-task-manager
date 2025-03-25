import TaskContext from './TasksContext'
import useTasks from '../hooks/useTasks';

export default function TasksProvider({ children }) {

    const { tasks, addTask, removeTask, updateTask } = useTasks();

    const values = {
        tasks,
        addTask,
        removeTask,
        updateTask
    }


    return (
        <TaskContext.Provider value={values}>
            {children}
        </TaskContext.Provider>
    )
}