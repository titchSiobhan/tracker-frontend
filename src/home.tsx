import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';
import Navbar from './components/navbar';
const API_URL = import.meta.env.VITE_API_URL;
import SignUp from './login-signUp/signUp';
import Login from './login-signUp/login';
import { useNavigate } from 'react-router';
import './home.css';

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

	 function toJob(id: string) {
        navigate(`/job/${id}`);
    }

	

	useEffect(() => {
		getTasks();
		getJobs();
	}, []);
	const { user, authReady } = useContext(UserContext);
	if (!authReady) return <p>Loading...</p>;
	if (!user)
		return (
			<>
				<Login />
				<SignUp />
			</>
		);

	return (
		<>
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
						<div className="task-box">
							<h2>Tasks</h2></div>

							{tasks.length > 0 ? (
								tasks.map((task: any) => (
									<div className="task tasks task-click" key={task.id}>
										<h3>{task.title}</h3>
										<p>{task.description.map((description: string) => <p>{description}</p>)}</p>
										<p>{task.category}</p>
										<p>£{task.pricePerUnit}</p>
									</div>
								))
							) : (
								<p>Add tasks in Profile → Settings to get started.</p>
							)}
						
					</div>

					<div className="job-area">
						<div className="clients">
							<h2>Clients</h2>
						</div>
						{jobs.length > 0 ? (
							jobs.map((job: any) => (
								<div className="task click" key={job.id}>
									<h3 onClick={() => toJob(job.id)}>{job.name}</h3>
									
								</div>
							))
						) : (
							<>
								<p>Add a job to get started.</p>
								<p className="go-to-jobs" onClick={() => navigate('/jobs')}>Go to Jobs</p>
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}

export default Home;
