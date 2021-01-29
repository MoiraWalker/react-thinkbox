import './index.scss';
import React, { useState } from 'react';
import axios from "axios";
import { UserEditForm } from "../../forms/organisms/userEditForm";

export const User = ({ id, email, setIsDeleted, setIsUpdated, firstName, lastName  })  => {
    const [ edit, toggleEdit ] = useState(false);

    async function deleteUser(id) {
        try {
            const result = await axios.delete(`http://localhost:8080/clients/${id}`);
            setIsDeleted(id);
        } catch (error) {
            console.error(error);
        }
    }

    const editUser = () => {
        toggleEdit(true);
    }

    return (
        <div className="user__card">
            { edit ? (
             <UserEditForm id={id} email={email} setIsUpdated={setIsUpdated} firstName={firstName} editOnFalse={ () => toggleEdit(false)}/>
            ) : (
                <div>
                    <h2>{firstName +" "+ lastName}</h2>
                    <p>{email}</p>
                    <div className="user__button-wrapper">
                        <button onClick={() => deleteUser(id)}>x</button>
                        <button onClick={editUser}>e</button>
                    </div>
                </div>
                )
            }
        </div>
    );
}


