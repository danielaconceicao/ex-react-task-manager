import { memo } from 'react'

function TaskRow({ task }) {

    const statusColor = {
        'To do': '#FF6347',
        Doing: '#FFD700',
        Done: '#32CD32'
    }

    return (
        <tr>
            <td>{task.title}</td>
            <td style={{ background: statusColor[task.status] }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default memo(TaskRow);