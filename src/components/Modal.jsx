import { createPortal } from 'react-dom';

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = 'Conferma' }) {

    if (!show) { return null; }

    return createPortal(
        <div className='my-modal-overlay'>
            <div className='my-modal-content'>
                <h2>{title}</h2>
                {content}
                <div className='modal-actions'>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    )
}

