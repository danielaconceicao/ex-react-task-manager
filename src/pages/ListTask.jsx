/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink } from "react-router-dom";
import TaskRow from "../components/TaskRow";
import { useContext, useState, useMemo, useCallback } from "react";
import TasksContext from "../context/TasksContext";

function debounce(callback, delay){
    let timer;
    return value => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay)
    }
}

export default function ListTask() {
    const { tasks } = useContext(TasksContext);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const debounceSearch = useCallback(
        debounce(setSearchQuery, 500)
    , []);

    const sortIcon = sortOrder === 1 ? <i className="bi bi-arrow-down"></i> : <i className="bi bi-arrow-up"></i>

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field);
            setSortOrder(1)
        }
    }

    const filteredAndSortedTasks = useMemo(() => {
        return [...tasks].filter(task => task.title.toLowerCase().includes(searchQuery)).sort((a, b) => {
            let comparison;

            if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title)
            } else if (sortBy === 'status') {
                const statusOptions = ['To do', 'Doing', 'Done'];
                comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status);
            } else if (sortBy === 'createdAt') {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();
                comparison = dateA - dateB
            }
            return comparison * sortOrder;
        })
    }, [tasks, sortBy, sortOrder, searchQuery])

    return (
        <>
            <h1>Lista di Tasks</h1>

            <div>
                <input type="text" placeholder="cerca una task..." onChange={(e) => debounceSearch(e.target.value)} />
            </div>

            <table border="2">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>Name {sortBy === 'title' && sortIcon}</th>
                        <th onClick={() => handleSort('status')}>Status{sortBy === 'status' && sortIcon}</th>
                        <th onClick={() => handleSort('createdAt')}>Data{sortBy === 'createdAt' && sortIcon}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* verificando se a tasks e um array, para nao gerar um erro durante o carregamento da pagina */}
                    {Array.isArray(tasks) && tasks.length > 0 ? (
                        filteredAndSortedTasks.map(task => (
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