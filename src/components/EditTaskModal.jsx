import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'To do');
    const editFormRef = useRef(null);

    useEffect(() => {
        if (show && task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStatus(task.status || 'To do');
        }
    }, [show, task]);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...task, title, description, status });
    };

    return (
        <Modal
            title="Modifica Task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <div>
                        <label>Nome:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div>
                        <label>Descrizione:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <label>Stato:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
            confirmText="Salva"
            onConfirm={() => editFormRef.current.requestSubmit()}
            show={show}
            onClose={onClose}
        />
    );
}
