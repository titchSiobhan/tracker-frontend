import Navbar from './navbar';
const API_URL = import.meta.env.VITE_API_URL;
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/userContext';


function SingleInvoice() {
	const { authFetch } = useContext(UserContext);
	const [invoice, setInvoice] = useState({} as any);
    const [total, setTotal] = useState(0);

	async function getInvoice(id: string) {
		const response = await authFetch(`${API_URL}invoice/${id}`);
		const data = await response.json();
		console.log(data);
		setInvoice(data);
	}
	useEffect(() => {
		getInvoice(window.location.pathname.split('/')[2]);
        const total = invoice?.tasks?.reduce((sum: number, task: any) => sum + Number(task.task.pricePerUnit), 0).toFixed(2);
        setTotal(Number(total));
	}, []);

	console.log(invoice);
   
	return (
		<>
			<Navbar />

			<div className="invoice">
				<h2>{invoice.formattedDate?.replace(/\//g, '')}</h2>
				<p>{invoice.formattedDate}</p>
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
