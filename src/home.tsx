import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import Navbar from './navbar';
const API_URL = import.meta.env.VITE_API_URL;
import SignUp from './signUp';
import Login from './login';
import { useNavigate } from 'react-router';

function Home() {
	const [tasks, setTasks] = useState([]);
    const [jobs, setJobs] = useState([]);
	const { authFetch } = useContext(UserContext);
	const navigate = useNavigate();

	async function getTasks() {
		const response = await authFetch(`${API_URL}task`);
		const data = await response.json();

		setTasks(data);
	}

     async function getJobs() {
        const response = await authFetch(`${API_URL}job`);
        const data = await response.json();
      
        setJobs(data);
        
    }

	useEffect(() => {
		getTasks();
        getJobs();
	}, []);
	const { user,  authReady } = useContext(UserContext);
	if (!authReady) return <p>Loading...</p>;
	if (!user)
		return (
			<>
				<Login />
				<SignUp />
			</>
		);

	return (
		<div>
			{!user && (
				<>
					<SignUp />
					<Login />
				</>
			)}
			{user && (
				<>
					<Navbar />

					<div className="task-area">
						{tasks.length > 0 ? (
							tasks.map((task: any) => (
								<div className="task" key={task.id}>
									<h3>{task.title}</h3>
									<p>{task.description}</p>
									<p>{task.category}</p>
									<p>{task.pricePerUnit}</p>
								</div>
							))
						) : (
							<p>Add tasks in Profile → Settings to get started.</p>
						)}
					</div>
                    {jobs.length > 0 ? (
                        jobs.map((job: any) => (
                            <div className="task" key={job.id}>
                                <h3>{job.name}</h3>
                                <p>{job.address}</p>
                                <p>{job.startDate}</p>
                                <p>{job.endDate}</p>
                            </div>
                        ))
                    ) : (
                       <>
  <p>Add a job to get started.</p>
  <p onClick={() => navigate('/jobs')}>Go to Jobs</p>
</>

                    )
                    }
				</>
			)}
		</div>
	);
}

export default Home;
