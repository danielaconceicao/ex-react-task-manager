import { memo } from 'react';
import { Link } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

function TaskRow({ task }) {

    const statusColor = {
        'To do': '#FF6347',
        Doing: '#FFD700',
        Done: '#32CD32'
    }

    return (
        <tr>
            <td>
                <Link to={`tasks/${task.id}`} style={{color: 'black', textDecoration: 'none'}}>
                    {task.title}
                </Link>
            </td>
            <td style={{ background: statusColor[task.status] }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default memo(TaskRow);