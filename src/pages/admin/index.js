import './index.scss';
import { User } from "../../components/user/user";
import {useEffect, useState} from "react";
import axios from "axios";

export const Admin = () => {
    const [clients, setClients] = useState([]);
    const [isUpdated, setIsUpdated] = useState(null);
    const [isDeleted, setIsDeleted ] = useState(null);

    useEffect(() => {
        getAllClients();
    }, [])

    useEffect(() => {
        if (isDeleted) {
            getAllClients();
            setIsDeleted(null);
        }
    }, [isDeleted])

    useEffect(() => {
        if (isUpdated) {
            getAllClients();
            setIsUpdated(null);
            console.log("is updated");
        }
    }, [isUpdated])

    async function getAllClients() {
        try {
            const result = await axios.get(`http://localhost:8080/clients`);
            setClients(result.data);
            console.log("clients", clients);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className='page__wrapper'>
            <div className="page__container">
                <h1 className="page__header">Admin</h1>
                {clients &&
                <div className='user__container'>
                    {
                        clients.map((client) => {
                            return <User setIsUpdated={setIsUpdated} setIsDeleted={setIsDeleted} key={client.email} firstName={client.firstName} lastName={client.lastName} email={client.email} id={client.id}></User>
                        })
                    }
                </div>
                }
            </div>
        </div>
    );
};