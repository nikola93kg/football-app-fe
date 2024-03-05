import React from 'react';
import "../styles/Modal.css"

function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                {children}
                <button className='cancel-btn' type="button" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
}

export default Modal;
