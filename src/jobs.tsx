import Navbar from "./navbar";
import {useState, useEffect, useContext} from "react";
const API_URL = import.meta.env.VITE_API_URL
import { useNavigate} from "react-router";
import {UserContext} from "./context/userContext";



function Jobs() {
    const navigate = useNavigate();
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
        getJobs();
        createJob();
    }

    async function getJobs() {
        const response = await authFetch(`${API_URL}job`);
        const data = await response.json();
        console.log(data);
        setJobs(data);
        
    }

    useEffect(() => {
        getJobs();
    }, [])

    function toJob(id: string) {
        navigate(`/job/${id}`);
    }
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

       {
        jobs.map((job: any) => (
            <div key={job._id}>
                <p onClick={() => toJob(job.id)}>{job.name}</p>
                
            </div>
        ))
       }
        </>
    )
}

export default Jobs