import { useState, useContext, useEffect } from 'react'
import { UserContext } from './context/userContext'
const API_URL = import.meta.env.VITE_API_URL



function CompanySettings() {
 const [company, setCompany] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    sortCode: "",
    accountNumber: "",
    accountName: ""
  });
const { authFetch } = useContext(UserContext);

async function getCompany() {
    const response = await authFetch(`${API_URL}company`);
    const data = await response.json();
    console.log(data);
   if (data) setCompany(data[0]);

}

console.log(company);
async function createCompany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const response = await authFetch(`${API_URL}company/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
           company
        )
    })
    const data = await response.json();
    console.log(data);
}
async function upDateCompany() {
    const response = await authFetch(`${API_URL}company/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
           company
        )
       
        
    })
    const data = await response.json();
    console.log(data);
    setCompany(data);
}

useEffect(() => {
    getCompany();
}, [])
const hasCompany = company && company.companyName !== '';
    console.log(hasCompany);
    return (
        <>
        
        { hasCompany ? <>
        <form onSubmit={upDateCompany}>
            <input type="text"  value={company.companyName} onChange={e => setCompany({...company, companyName: e.target.value})}/>
            <input type="text" value={company.phoneNumber} onChange={e => setCompany({...company, phoneNumber: e.target.value})}/>
            <input type="text"  value={company.email} onChange={e => setCompany({...company, email: e.target.value})}/>
            <input type="text" value={company.sortCode} onChange={e => setCompany({...company, sortCode: e.target.value})}/>
            <input type="text" value={company.accountNumber} onChange={e => setCompany({...company, accountNumber: e.target.value})}/>
            <input type="text"  value={company.accountName} onChange={e => setCompany({...company, accountName: e.target.value})}/>
            <button type="submit">Save</button>
        </form>
        </> :
            <form onSubmit={createCompany}>
            <input type="text" placeholder="Company Name"  onChange={e => setCompany({...company, companyName: e.target.value})}/>
            <input type="text" placeholder="Phone Number" onChange={e => setCompany({...company, phoneNumber: e.target.value})}/>
            <input type="text" placeholder="Email" onChange={e => setCompany({...company, email: e.target.value})}/>
            <input type="text" placeholder="Sort Code" onChange={e => setCompany({...company, sortCode: e.target.value})}/>
            <input type="text" placeholder="Account Number" onChange={e => setCompany({...company, accountNumber: e.target.value})  }/>
            <input type="text" placeholder="Account Name" onChange={e => setCompany({...company, accountName: e.target.value})}/>
            <button type="submit">Save</button>
        </form> } 
        </>
    )
}

export default CompanySettings