import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;
import TasksContext from "../context/TasksContext";

export default function TaskDetail() {
    const { id } = useParams();
    const taskId = parseInt(id);
    const [task, setTask] = useState([]);
    const navigate = useNavigate();
    const { removeTask } = useContext(TasksContext);

    useEffect(() => {
        async function fetchTask() {
            try {
                const response = await fetch(`${VITE_API_URL}/${taskId}`);
                const data = await response.json();
                /*    console.log(data) */

                if (!data || data.length === 0) throw new Error('Task non trovata');

                setTask(data[0]);
            } catch (err) { console.error(err.message) }
        }

        fetchTask()
    }, [taskId])


    const handleDelete = async () => {
        try {
            await removeTask(task.id);
            alert('Task eliminata con successo!');
            navigate('/');
        } catch (err) { console.error(err.message) }
    }


    return (
        <div>
            <h1>Dettaglio Task</h1>
            <p><strong>Nome:</strong> {task.title}</p>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Data di creazione:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>
            <button onClick={handleDelete}>Elimina Task</button>
            <button><Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>Tasks</Link></button>
        </div>
    )
}
