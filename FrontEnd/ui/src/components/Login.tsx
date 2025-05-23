import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../styles/Login.css"
import { useNavigate } from "react-router-dom";
import APIHelper from "../utils/APIHelper";

const Login = () => 
{
    const helper = new APIHelper();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const login = async () => {
        const res: string = await helper.login(username, password);
        window.localStorage.setItem("token", res);
        // this is needed to re render current window
        window.dispatchEvent(new StorageEvent("storage", { key: "token" }));
        navigate("/", {replace:false});
    }

    return (
        <div className='login-container'>
            <div className='login'>
                <div className="from form-group">
                    <label className="form-text">Username</label>
                    <input 
                        className="form-control form-control-sm" 
                        onChange={(e:any) => setUsername(e.target.value)} 
                        type="text" 
                    />
                </div>
                <div className="from form-group">
                    <label className="form-text">Password</label>
                    <input 
                        className="form-control form-control-sm" 
                        onChange={(e:any) => setPassword(e.target.value)} 
                        type="password" 
                    />
                </div>
                <div className="from form-group btn-container">
                    <button 
                        className='login-button btn btn-secondary'
                        onClick={async () => { await login()}}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login