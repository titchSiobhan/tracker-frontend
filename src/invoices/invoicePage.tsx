import Navbar from '../components/navbar';
const API_URL = import.meta.env.VITE_API_URL;
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, Link } from 'react-router';

// @ts-ignore
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.js';

function SingleInvoice() {
	const { authFetch, user } = useContext(UserContext);
	const [invoice, setInvoice] = useState({} as any);
	const navigate = useNavigate();
	const [jobs, setJobs] = useState<Job[]>([]);
	const [payDate, setPayDate] = useState('');
	const [payToggle, setPayToggle] = useState(false);
	function downloadPDF() {
		const element = document.getElementById('invoice');
		if (!element) return;

		html2pdf()
			.from(element)
			.set({
				margin: 10,
				filename: `${invoice.invoiceNumber}.pdf`,
				html2canvas: { scale: 2, useCORS: true },
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			})
			.save();
	}

async function payInvoice(id: string, e: React.FormEvent<HTMLFormElement>) {
	e.preventDefault();
	const ok = window.confirm('Are you sure you want to mark this invoice as paid?');
	if (!ok) return;
	if (ok) {
		const response = await authFetch(`${API_URL}invoice/paid/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({paidDate: new Date(payDate).toISOString()})
			,
		});
		const data = await response.json();
		console.log(data);
	}
}
	async function isPaid() {
		setPayToggle( prev => !prev);
	}
	async function deleteInvoice(id: string) {
		const ok = window.confirm('Are you sure you want to delete this invoice?');
		if (!ok) return;
		if (ok) {
			const response = await authFetch(`${API_URL}invoice/delete/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();
			console.log(data);
			navigate('/invoice');
		}
	}
	async function getInvoice(id: string) {
		const response = await authFetch(`${API_URL}invoice/${id}`);
		const data = await response.json();
		
		setInvoice(data);
		setJobs(data.jobs);
		
	}
	useEffect(() => {
		getInvoice(window.location.pathname.split('/')[2]);
	}, []);

	type Job = {
		id: string;
		job: {
			name: string;
			street: string[];
			town: string[];
			postcode: string;
		};
	};
	
	const name = jobs?.map((job: any) => job.job.name).join(', ');


	const total = invoice.tasks?.reduce((sum: number, item: any) => {
		const price = Number(item.task.pricePerUnit);
		return sum + price * item.quantity;
	}, 0);
	if (!user) return <p>Loading...</p>;
	if (!user.company) {
		return (
			<>
				<Navbar />
				<p>Add a company</p>
				<Link to="/profile">Profile</Link>
			</>
		);
	}
	

	return (
		<>
			<Navbar />
			<div className="invoice-single">
				<div className="btns">
					<div className="back">
						<button onClick={() => navigate(-1)}>Back</button>
					</div>
					<div className="download">
						<button onClick={downloadPDF}>Download</button>
					</div>
					<div className="delete">
						<button onClick={() => deleteInvoice(invoice.id)}>Delete</button>
					</div>
					<div className="paid"><button onClick={() =>isPaid()}>Paid</button></div>
					{payToggle && (
						<div className="paid">
						<form onSubmit={(e) => payInvoice(invoice.id, e)}>
						
							<input className="date"
						type="date"
						name="date"
						onChange={(e) => setPayDate(e.target.value)}
					/>
					<button type="submit">Submit</button>
					</form>
						</div>
					)}
				</div>
				<div className="invoice" id="invoice">
					{user?.company?.companyImageLarge ? (
						<img
							src={`http://localhost:3000/uploads/${encodeURIComponent(user.company.companyImageLarge)}`}
							alt="Company Logo"
							className="logo"
						/>
					) : (
						<></>
					)}
					<h2 className="number">Invoice: {invoice.invoiceNumber}</h2>

					{user && (
						<div className="company">
							<h2>{user?.company.companyName}</h2>
							<h3>
								{user.firstName} {user.lastName}
							</h3>
							<p className="email">Email: {user.company.email}</p>
							<p className="phone">Phone: {user.company.phoneNumber}</p>
						</div>
					)}

					<p className="date">
						{invoice.formattedDate?.slice(0, 8).split('/').reverse().join('/')}
					</p>

					<div className="client">
						<h2 className="name">{name}</h2>
						
						{jobs?.[0]?.job?.street?.map((item: string, i: number) => (
      <p key={i}>{item}</p>
    ))}

    {jobs?.[0]?.job?.town?.map((item: string, i: number) => (
      <p key={i}>{item}</p>
    ))}


						<p>{jobs[0]?.job?.postcode.toUpperCase()}</p>
					</div>

					<div className="table">
						<p> </p>
						<p className="description">Description</p>
						<p>Quantity</p>

						<p className="price">Price</p>
						<p className="price">Subtotal</p>
					</div>
					{invoice.tasks?.map((task: any) => (
						<div key={task.taskId} className="task-invoice task">
							<p className="title">{task.task.title}</p>
							<p>{task.task.description.map((item: any) => item).join(', ')}</p>
							<p>{task.quantity}</p>

							<p className="price">£{task.task.pricePerUnit}</p>
							<p className="price">£{task.task.pricePerUnit * task.quantity}</p>
						</div>
					))}
					<p className="total"> Total: £{total}</p>

					{user?.company && (
						<div className="payment">
							<p>Sort Code: {user.company.sortCode}</p>
							<p>Account Number: {user.company.accountNumber}</p>
							<p>Account Name: {user.company.accountName}</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default SingleInvoice;
