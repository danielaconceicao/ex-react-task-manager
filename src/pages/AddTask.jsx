import { NavLink } from "react-router-dom";
import { useState, useRef, useMemo } from "react";
import { useContext } from "react";
import TasksContext from "../context/TasksContext";

export default function AddTask() {
    const { addTask } = useContext(TasksContext);


    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const descrizione = useRef();
    const status = useRef();

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    const nameValidator = useMemo(() => {
        const inputName = [...name].every(letter => !symbols.includes(letter));
        return inputName && name.trim().length >= 3
    }, [name]);

    async function handleFormSubmit(e) {
        e.preventDefault();

        if (!name.trim() || !nameValidator || !descrizione.current.value || !status.current.value) {
            setMessage('Errore: Compilare tutti i campi correttamente.');
            return;
        }

        const newTask = {
            title: name.trim(),
            description: descrizione.current.value,
            status: status.current.value
        }

        try {
            await addTask(newTask);

            alert('Task creata con successo!');

            setName('');
            descrizione.current.value = '';
            status.current.value = '';

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <h2>Aggiungi Task</h2>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name">
                        <p>Nome del task(title)</p>
                        <input type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {name.trim() && (
                            <p style={{ color: nameValidator ? 'green' : 'red' }}>
                                {nameValidator ? 'Nome valido' : 'I nomi non possono contenere simboli'}
                            </p>
                        )}
                    </label>
                </div>

                <div>
                    <label htmlFor="descrizione">
                        <p>Descrizione</p>
                        <textarea name="descrizione"
                            id="descrizione"
                            ref={descrizione} />
                    </label>
                </div>

                <div>
                    <label htmlFor="status">
                        <p>status</p>
                        <select className="form-select form-select-sm" aria-label="Small select example" id="status"
                            name="status" ref={status}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                </div>

                <button type="Submit" disabled={!nameValidator}>Aggiungi Task</button>
            </form>
            {message}
            <button>
                <NavLink to="/" style={{ color: 'black', textDecoration: 'none' }}>Tasks</NavLink>
            </button>
        </>
    )
}