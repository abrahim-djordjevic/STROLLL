import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Header from '../components/Header';
import APIHelper from '../utils/APIHelper';
import { Routine } from '../types/routine';
import "../styles/Routines.css";

const Routines = () => 
{
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
    const [routines, setRoutines] = useState<Routine[]>([]);
    const apiHelper = new APIHelper();

    const logout = () => {
        window.localStorage.removeItem("token")
        setToken("");
    }

    useEffect(() => {
        window.addEventListener("storage", () => {
            if(window.localStorage.token !== token) {
                setToken(localStorage.token);
            }
        });

        window.addEventListener('beforeunload', (ev) => {
            logout();
        });
    }, []);

    useEffect(() => {
        if(token === "" || token === null || token === undefined || token === "undefined") return;
        (async function() {
            const records: Routine[] = await apiHelper.getAllRoutines();
            setRoutines(records);
        })();
    }, [token]);

    if(token === "" || token === null || token === undefined || token === "undefined") {
        return(<Login />);
    } else {
        return(
            <div className='routine-page'>
                <Header logoutMethod={logout} />
                <div className='routine-page-body'>
                    <div className='routine-table-container'>
                        <>
                            <table className='routine-table table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Difficulty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routines.map((routine: Routine, index: number) => 
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{routine.name}</td>
                                            <td>{routine.description}</td>
                                            <td>{routine.difficulty}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </>
                    </div>
                </div>
            </div>
        )
    }
}

export default Routines;