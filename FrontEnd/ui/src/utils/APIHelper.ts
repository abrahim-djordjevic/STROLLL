import { Routine } from "../types/routine";
import { Session } from "../types/session";
import { User } from "../types/user";

export default class APIHelper
{
    baseURL: string | undefined;

    public constructor()
    {   
        this.baseURL = process.env.REACT_APP_API_URL;
    }   

    public async login(username: string, password: string)
    {
        const url = this.baseURL + "/User/Login";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({"username":username, "password":password})
        });
        const results = await response.json();
        return results.token;
    }

    public async getAllSessions()
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/Session/GetAllSessions";   
            const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: Session[] = await response.json();
        return results;    
    }

    public async getAllRoutines()
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/Routine/GetAllRoutines";   
            const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: Routine[] = await response.json();
        return results;    
    }

    public async getAllPatients()
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/User/GetAllUsers";   
            const response = await fetch(url, {
            method:"GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const results: User[] = await response.json();
        return results.filter((u:User) => u.role == 1);    
    }

    public async addSession(session: Session)
    {
        const token = localStorage.getItem("token");
        const url = this.baseURL + "/Session/AddSession";
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(session)
        });
        return;
    }
}