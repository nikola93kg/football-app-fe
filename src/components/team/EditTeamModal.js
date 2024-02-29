import React, { useState } from 'react';
import "../../styles/EditTeamModal.css"

function EditTeamModal({ team, onClose, onSave }) {
    const [name, setName] = useState(team.name);
    const [logo, setLogo] = useState(team.logo);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(team.id, { name, logo });
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="team-name">
                        Team Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="team-logo-url">
                        Team Logo URL:
                        <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
                    </div>
                    <button className='save-btn' type="submit">Save Changes</button>
                    <button className='cancel-btn' type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditTeamModal;
