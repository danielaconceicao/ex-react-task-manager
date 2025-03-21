import { NavLink } from "react-router-dom";
import TaskRow from "../components/TaskRow";
import { useContext } from "react";
import TasksContext from "../context/TasksContext";

export default function ListTask() {
    const { tasks } = useContext(TasksContext);

    return (
        <>
            <h1>Lista di Tasks</h1>

            <table border="2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {/* verificando se a tasks e um array, para nao gerar um erro durante o carregamento da pagina */}
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        tasks.map(task => (
                            <TaskRow key={task.id} task={task} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Nessuna task trovata!</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button>
                <NavLink to="/addtask" style={{ color: 'black', textDecoration: 'none' }}>Aggiungi Task </NavLink>
            </button>
        </>
    )
}