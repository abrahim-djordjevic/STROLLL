import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Header from '../components/Header';
import { Session } from '../types/session';
import APIHelper from '../utils/APIHelper';
import "../styles/Sessions.css";
import AddSessionButton from '../components/AddSessionButton';
const Sessions = () => 
{
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
    const [sessions, setSessions] = useState<Session[]>([]);
    const apiHelper = new APIHelper();

    const logout = () => {
        window.localStorage.removeItem("token")
        setToken("");
    }

    const getSessions = async () => {
        const records: Session[] = await apiHelper.getAllSessions();
        setSessions(records);
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
            await getSessions();
        })();
    }, [token]);

    if(token === "" || token === null || token === undefined || token === "undefined") {
        return(<Login />);
    } else {
        return(
            <div className='session-page'>
                <Header logoutMethod={logout} />
                <div className='session-page-body'>
                    <AddSessionButton submitMethod={async () => await getSessions()}/>
                    <div className='session-table-container'>
                        <>
                            <table className='session-table table table-striped table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient</th>
                                        <th>Routine</th>
                                        <th>Session Start</th>
                                        <th>Session End</th>
                                        <th>User Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sessions.map((session: Session, index: number) => 
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{session.patientName}</td>
                                            <td>{session.routineName}</td>
                                            <td>{session.sessionStartTime}</td>
                                            <td>{session.sessionEndTime}</td>
                                            <td>{session.userRating}</td>
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

export default Sessions;