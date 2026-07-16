import Navbar from "./components/navbar";
import {useState, useEffect, useContext} from "react";
const API_URL = import.meta.env.VITE_API_URL
import { useNavigate} from "react-router";
import {UserContext} from "./context/userContext";
import "./jobs.css"


function Jobs() {
    const navigate = useNavigate();
    const [createJobToggle, setCreateJobToggle] = useState(false);
    const [name, setName] = useState('');
    const [street, setStreetAddress] = useState('');
    const [town, setTown] = useState('');
    const [postcode, setPostcode] = useState('');
    const { authFetch } = useContext(UserContext);
    const [ jobs, setJobs] = useState([]);

    function createJob() {
        setCreateJobToggle(prev => !prev);
    }

    async function createAJob(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const job = {name, street, town, postcode};
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
        <div className="job-section">
            
        <button onClick={createJob} className="btn">Create Job</button>


       {createJobToggle && 
       <div className="create-task"><form onSubmit={createAJob}>
            <input type="text" placeholder="Name" required onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder="Street" onChange={(e) => setStreetAddress(e.target.value)}/>
            <input type="text" placeholder="Town" onChange={(e) => setTown(e.target.value)}/>
            <input type="text" placeholder="Post code" onChange={(e) => setPostcode(e.target.value)}/>
            <button type="submit">Submit</button>

        </form>
        </div>
}

       {
        jobs.map((job: any) => (
            <div key={job._id} className="job">
                <p onClick={() => toJob(job.id)}>{job.name}</p>
                
            </div>
        ))
       }
       </div>
        </>
    )
}

export default Jobs