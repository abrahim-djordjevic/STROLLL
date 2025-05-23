import React, { useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { User } from "../types/user";
import { Routine } from "../types/routine";
import APIHelper from "../utils/APIHelper";
import { Session } from "../types/session";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { AddModalProps } from "../types/AddModalProps";

const AddSessionButton = (props: AddModalProps) => 
{
    const emptySession: Session = 
    {
        id:"",
        patientId:"",
        routineId:"",
        patientName:"",
        routineName:"",
        sessionStartTime:"",
        sessionEndTime:"",
        userRating:0
    };

    const [patients, setPatients] = useState<User[]>([]);
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
    const [showModal, setShowModal] = useState<boolean>(false);
    const apiHelper = new APIHelper();
    const [session, setSession] = useState<Session>(emptySession);

    useEffect(() => {
        if(token === "" || token === null || token === undefined || token === "undefined") return;
        (async function() {
            const routines: Routine[] = await apiHelper.getAllRoutines();
            const patients: User[] = await apiHelper.getAllPatients();
            setRoutines(routines);
            setPatients(patients);

            session.id = uuidv4();
            session.patientId = patients[0].id;
            session.patientName = patients[0].username;
            session.routineId = routines[0].id;
            session.routineName = routines[0].name;
        })();
    }, [token]);

    const onSubmitClick = async () => {
        await apiHelper.addSession(session);
        if(props.submitMethod !== null) props.submitMethod();
        setShowModal(false);
    }

    if(showModal)
    {
        return(
            <Modal
                show={true}
                size="lg"
                centered={true}
            >
                <Modal.Header>
                    <h5>
                        Add Session
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body-container">
                        <div className="patient form-group">
                            <label className="form-text">Patient</label>
                            <select 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {
                                    var data = JSON.parse(e.target.value);
                                    session.patientName = data.username;
                                    session.patientId = data.id;
                                }}
                                defaultValue={session.patientName}
                            >
                                {
                                    patients.map((patient:User) => 
                                        <option value={JSON.stringify(patient)}>{patient.username}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="routine form-group">
                            <label className="form-text">Routine</label>
                                <select 
                                    className="form-control form-control-sm" 
                                    onChange={(e:any) => {
                                        var data = JSON.parse(e.target.value)
                                        session.routineName = data.name
                                        session.routineId = data.id;
                                    }}
                                    defaultValue={session.routineName}
                                >
                                {
                                    routines.map((routine:Routine) => 
                                        <option value={JSON.stringify(routine)}>{routine.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="session-start form-group">
                            <label className="form-text">Session Start</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {session.sessionStartTime = moment(e.target.value).toISOString()}} 
                                defaultValue={moment(session.sessionStartTime).format("YYYY-MM-DDTHH:mm")}
                                type="datetime-local" 
                            />
                        </div>
                        <div className="session-end form-group">
                            <label className="form-text">Session End</label>
                            <input 
                                className="form-control form-control-sm" 
                                onChange={(e:any) => {session.sessionEndTime = moment(e.target.value).toISOString()}} 
                                defaultValue={moment(session.sessionEndTime).format("YYYY-MM-DDTHH:mm")}
                                type="datetime-local" 
                            />
                        </div>
                        <div className="user-rating form-group">
                            <label className="form-text">User Rating</label>
                            <input 
                                className="form-control form-control-sm"
                                onChange={(e:any) => session.userRating = e.target.value}
                                defaultValue={session.userRating}
                                type="number"
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success"
                        onClick={async () => { await onSubmitClick() }}
                    >
                        Submit
                    </Button>
                    <Button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    else
    {
        return(
            <Button
                className="btn btn-success add-session-button"
                onClick={() => setShowModal(true)}
            >
                Add Session
            </Button>
        );
    }
}

export default AddSessionButton;