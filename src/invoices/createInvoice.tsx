import { useState, useContext, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import { UserContext } from '../context/userContext';

type CreateInvoicePageProps = {
	createInvoice: () => void;
};

function CreateInvoicePage({ createInvoice }: CreateInvoicePageProps) {
	const { authFetch } = useContext(UserContext);
	type Task = {
		id: string;
		title: string;
		description: string;
		category: string;
		pricePerUnit: number;
		quantity: number;
	};
	type Job = {
		id: string;
		name: string;
		address?: string;
		startDate?: string;
		endDate: string;
	};
	const [tasks, setTasks] = useState<Task[]>([]);
	const [basket, setBasket] = useState<Task[]>([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobId, setJobId] = useState<string>('');
	const [date, setDate] = useState('');

	async function getTasks() {
		const response = await authFetch(`${API_URL}task`);
		const data = await response.json();

		setTasks(data);
	}

	useEffect(() => {
		getTasks();
		getJobs();
	}, []);
	
	const total = basket.reduce((sum:number, item: any) => {
		const price = Number(item.pricePerUnit);
		return sum + price * item.quantity;
	}, 0)

	const filteredTasks = tasks.filter((task: Task) => {
		if (selectedCategory === '') return true;
		return task.category === selectedCategory;
	});


	async function submitInvoice() {
		if (basket.length === 0) {
			alert('Please add at least one task to the basket.');
			return;
		}

		if (jobId === '') {
			alert('Please select a client.');
			return;
		}
		const tasks = basket.map((task: Task) => ({
			taskId: task.id,
			quantity: task.quantity,
		}));
		
		const jobIds = jobId;
		const response = await authFetch(`${API_URL}invoice/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ tasks, jobIds, dateCreated: new Date(date).toISOString() }),
		});
		const data = await response.json();
		console.log(data);
		createInvoice();
		window.location.reload();
	}
	
	async function getJobs() {
		const response = await authFetch(`${API_URL}job`);
		const data = await response.json();
		console.log(data);
		setJobs(data);
	}

	const categories = [...new Set(tasks.map((task) => task.category))];

	
	return (
		<>
			<div className="create-invoice">
				<div className="close" onClick={createInvoice}>
					X
				</div>
				<div className="filter">
					<p>Filter by category</p>
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						<option value="">All</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>
				<div className="invoice">
					<div className="choosePerson">
						<p>Client</p>
						<select value={jobId} onChange={(e) => setJobId(e.target.value)}>
							<option value="">Select job</option>
							{jobs.map(({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
						</select>
					</div>
					<input className="date"
						type="date"
						name="date"
						onChange={(e) => setDate(e.target.value)}
					/>

					<p>Total: £{total}</p>

					<button onClick={submitInvoice}>Submit</button>
				</div>

				{filteredTasks.map((task: any) => (
					<div key={task.id}>
						<p>{task.title}</p>
						<p>{task.description}</p>
						<p>{task.privateDescription}</p>
						<p>{task.category}</p>
						<p>£{task.pricePerUnit} </p>
						<button
							onClick={() => setBasket([...basket, { ...task, quantity: 1 }])}
						>
							Add to basket
						</button>
						{basket.some((b) => b.id === task.id) && (
							<>
								<button
									onClick={() =>
										setBasket(basket.filter((b) => b.id !== task.id))
		
							}
								>
									Remove from basket
								</button>
								<div className="quantity">
								<button
									onClick={() => {
										setBasket(
											basket
												.map((t) =>
													t.id === task.id
														? { ...t, quantity: t.quantity - 1 }
														: t,
												)
												.filter((t) => t.quantity > 0),
										);
									}}
								>
									-
								</button>

								<p>
									Quantity: {basket.filter((b) => b.id === task.id)[0].quantity}
									</p>
									<button
										onClick={() => {
											setBasket(
												basket.map((t) =>
													t.id === task.id
														? { ...t, quantity: t.quantity + 1 }
														: t,
												),
											);
										}}
									>
										+
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</>
	);
}

export default CreateInvoicePage;
