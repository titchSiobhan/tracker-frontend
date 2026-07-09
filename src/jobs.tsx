import Navbar from "./navbar";
import {useState, useEffect, useContext} from "react";
const API_URL = import.meta.env.VITE_API_URL

import {UserContext} from "./context/userContext";



function Jobs() {
    const [createJobToggle, setCreateJobToggle] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authFetch } = useContext(UserContext);
    const [ jobs, setJobs] = useState([]);

    function createJob() {
        setCreateJobToggle(prev => !prev);
    }

    async function createAJob(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const job = {name, address, startDate, endDate};
        const response = await authFetch(`${API_URL}job/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)
        })
        const data = await response.json();
        console.log(data);
    }

    async function getJobs() {
        const response = await fetch(`${API_URL}job/get`);
        const data = await response.json();
        console.log(data);
        setJobs(data);
    }

    useEffect(() => {
        getJobs();
    }, [])
    return (
        <>
        <Navbar />
        <button onClick={createJob}>Create Job</button>


       {createJobToggle && <form onSubmit={createAJob}>
            <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
            <input type="date" placeholder="Start Date" onChange={(e) => setStartDate(e.target.value)}/>
            <input type="date" placeholder="End Date" onChange={(e) => setEndDate(e.target.value)}/>
            <button type="submit">Submit</button>

        </form>}
        </>
    )
}

export default Jobs