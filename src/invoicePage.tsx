import Navbar from './navbar';
const API_URL = import.meta.env.VITE_API_URL;
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';


function SingleInvoice() {
	const { authFetch } = useContext(UserContext);
	const [invoice, setInvoice] = useState({} as any);
   
	const [jobs, setJobs] = useState([]);

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
       
	
	const name =jobs?.map((job: any) => job.job.name).join(', ') ;
	console.log(name);
	console.log(invoice);
	console.log(total);
   
	return (
		<>
			<Navbar />

			<div className="invoice">
				<h2>{invoice.formattedDate?.replace(/\//g, '')}</h2>
				<p>{invoice.formattedDate?.slice(0, 8).split('/').reverse().join('/')}</p>
				<h2>{name}</h2>

                Total: £{total}
                {
                    invoice.tasks?.map((task: any) => (
                        <div key={task.taskId}>
                            <p>{task.task.title}</p>
                            <p>{task.task.description}</p>
                            <p>{task.task.category}</p>
                            <p>£{task.task.pricePerUnit}</p>
                        </div>
                    ))
                }
			</div>
		</>
	);
}

export default SingleInvoice;
