import { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
const API_URL = import.meta.env.VITE_API_URL;

type Company = {
	id: string;
	companyName: string;
	phoneNumber: string;
	email: string;
	sortCode: string;
	accountNumber: string;
	accountName: string;
};

function CompanySettings() {
	const [createCompanyState, setCreateCompanyState] = useState<Company>({
		id: '',
		companyName: '',
		phoneNumber: '',
		email: '',
		sortCode: '',
		accountNumber: '',
		accountName: '',
	});
	const [company, setCompany] = useState<Company>({
		id: '',
		companyName: '',
		phoneNumber: '',
		email: '',
		sortCode: '',
		accountNumber: '',
		accountName: '',
	});
	const { authFetch } = useContext(UserContext);
	async function getCompany() {
		const response = await authFetch(`${API_URL}company`);
		const data = await response.json();
		
		if (Array.isArray(data) && data.length > 0) {
    setCompany(data[0]);
}

	}


	async function createCompany(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const response = await authFetch(`${API_URL}company/create`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(createCompanyState),
		});
		const data = await response.json();
		console.log(data);
	}
	async function upDateCompany(id: string) {
		const response = await authFetch(`${API_URL}company/update/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(company),
		});
		const data = await response.json();
		
		setCompany(data);
	}

	useEffect(() => {
		getCompany();
	}, []);
	
	const hasCompany = company && company.companyName !== '';
	
	return (
		<>
			{hasCompany ? (
				<>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							upDateCompany(company.id);
						}}
					>
						<label htmlFor="companyName">Company Name</label>
						<input
							type="text"
							value={company.companyName}
							onChange={(e) =>
								setCompany({ ...company, companyName: e.target.value })
							}
						/>
						< label htmlFor="phoneNumber">Phone Number</label>
						<input
							type="text"
							value={company.phoneNumber}
							onChange={(e) =>
								setCompany({ ...company, phoneNumber: e.target.value })
							}
						/>
						<label htmlFor="email">Email</label>
						<input
							type="text"
							value={company.email}
							onChange={(e) =>
								setCompany({ ...company, email: e.target.value })
							}
						/>
						<label htmlFor="sortCode">Sort Code</label>
						<input
							type="text"
							value={company.sortCode}
							onChange={(e) =>
								setCompany({ ...company, sortCode: e.target.value })
							}
						/>
						<label htmlFor="accountNumber">Account Number</label>
						<input
							type="text"
							value={company.accountNumber}
							onChange={(e) =>
								setCompany({ ...company, accountNumber: e.target.value })
							}
						/>
						<label htmlFor="accountName">Account Name</label>
						<input
							type="text"
							value={company.accountName}
							onChange={(e) =>
								setCompany({ ...company, accountName: e.target.value })
							}
						/>
						<button type="submit">Save</button>
					</form>
				</>
			) : (
				<form onSubmit={createCompany}>
    <label htmlFor="companyName">Company Name</label>
    <input
        type="text"
        placeholder="Company Name"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                companyName: e.target.value
            })
        }
    />

    <label htmlFor="phoneNumber">Phone Number</label>
    <input
        type="text"
        placeholder="Phone Number"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                phoneNumber: e.target.value
            })
        }
    />

    <label htmlFor="email">Email</label>
    <input
        type="text"
        placeholder="Email"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                email: e.target.value
            })
        }
    />

    <label htmlFor="sortCode">Sort Code</label>
    <input
        type="text"
        placeholder="Sort Code"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                sortCode: e.target.value
            })
        }
    />

    <label htmlFor="accountNumber">Account Number</label>
    <input
        type="text"
        placeholder="Account Number"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                accountNumber: e.target.value
            })
        }
    />

    <label htmlFor="accountName">Account Name</label>
    <input
        type="text"
        placeholder="Account Name"
        onChange={(e) =>
            setCreateCompanyState({
                ...createCompanyState,
                accountName: e.target.value
            })
        }
    />

    <button type="submit">Save</button>
</form>

			)}
		</>
	);
}

export default CompanySettings;
