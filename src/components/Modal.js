import React from 'react';
import "../styles/Modal.css"

function Modal({ children, onClose }) {

    const stopPropagation = (e) => {
        e.stopPropagation();
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={stopPropagation}>
                {children}
                <button className='cancel-btn' type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default Modal;
