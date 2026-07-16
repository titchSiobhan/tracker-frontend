import Navbar from '../components/navbar';
const API_URL = import.meta.env.VITE_API_URL;
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router';


function SingleInvoice() {
	const { authFetch, user } = useContext(UserContext);
	const [invoice, setInvoice] = useState({} as any);
   const navigate = useNavigate();
	const [jobs, setJobs] = useState<Job[]>([]);

	async function getInvoice(id: string) {
		const response = await authFetch(`${API_URL}invoice/${id}`);
		const data = await response.json();
		console.log(data);
		setInvoice(data);
		setJobs(data.jobs);
	}
	useEffect(() => {
		getInvoice(window.location.pathname.split('/')[2]);
        
	}, []);
const total = invoice?.tasks?.reduce((sum: number, task: any) => sum + Number(task.task.pricePerUnit), 0).toFixed(2);
	   type Job = {
		id: string;
		job: {
			name: string;
			street: string;
			town: string;
			postcode: string;
		};
	   }
	
	const name =jobs?.map((job: any) => job.job.name).join(', ') ;
	console.log(user)
	return (
		<>
			<Navbar />
			<div className="invoice-single">
		<div className="back">
			<button onClick={() => navigate(-1)}>Back</button>
		</div>
		<div className="download">
			<button onClick={() => window.print()}>Download</button>
		</div>
			<div className="invoice">
				
				
				<h2 className="number">Invoice: {invoice.formattedDate?.replace(/\//g, '')}</h2>
				

			{user  && <div className="company">
				<h2>{user?.company.companyName}</h2>
			<h3>{user.firstName} {user.lastName}</h3>
				<p className="email">Email: {user.company.email}</p>
				<p className="phone">Phone: {user.company.phoneNumber}</p>
			</div>}
				
				<p className="date">{invoice.formattedDate?.slice(0, 8).split('/').reverse().join('/')}</p>

				<div className="client">
				<h2 className="name">{name}</h2>
				<p>{jobs[0]?.job?.street}</p>
				<p>{jobs[0]?.job?.town}</p>
				<p>{jobs[0]?.job?.postcode}</p>
				</div>

               
                {
                    invoice.tasks?.map((task: any) => (
                        <div key={task.taskId} className="task-invoice task">
                            <p className="title">{task.task.title}</p>
                            <p>{task.task.description}</p>
                            <p>{task.task.category}</p>
                            <p className="price">£{task.task.pricePerUnit}</p>
                        </div>
                    ))
                } 
				<p className="total"> Total: £{total}
				</p>

				<div className="payment">
					<p>Sort Code: {user.company.sortCode}</p>
					<p>Account Number: {user.company.accountNumber}</p>
					<p>Account Name: {user.company.accountName}</p>
				</div>
			</div>
			</div>
		</>
	);
}

export default SingleInvoice;
