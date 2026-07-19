import Navbar from "../components/navbar";
import { useState, useContext, useEffect } from "react";
import CreateInvoicePage from "./createInvoice";
import { UserContext } from "../context/userContext";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate, Link } from "react-router";
import "./invoice.css"


function Invoice() {
const [createInvoiceToggle, setCreateInvoiceToggle] = useState(false);
const [invoices, setInvoices] = useState<any[]>([]);
const { authFetch, user } = useContext(UserContext);
const navigate = useNavigate();


async function getInvoices() {
    const response = await authFetch(`${API_URL}invoice`);
    const data = await response.json();
    
    setInvoices(data);
}

async function getInvoice(id: string) {
    const response = await authFetch(`${API_URL}invoice/${id}`);
    const data = await response.json();
    console.log(data);
    navigate(`/invoice/${id}`);
}

useEffect(() => {
    getInvoices();
}, [])

function createInvoice() {
    setCreateInvoiceToggle(prev => !prev);
}

if (!user?.company) 
		{
		return (
			<div className="no-company">
			<Navbar />
			<p>Add a company in profile settings</p>
			<Link to="/profile">Profile</Link>
			</div>
		)
	}
    return (
        <>
            <Navbar />
            <div className="invoice-area">
            <button onClick={createInvoice}>Create Invoice</button>
            {
                createInvoiceToggle && (
                    <div>
                       <CreateInvoicePage createInvoice={createInvoice}/>
                    </div>
                )
            }
            <div className="invoice-list-area">
            {
                invoices.map((invoice: any) => (
                    <div className="invoice-list-data" key={invoice.id} onClick={() => getInvoice(invoice.id)}>
                        <p className="invoice-date">{invoice.invoiceNumber}</p>
                        <p >{invoice.jobs[0].job.name}</p>
                    </div>
                ))
            }</div>
            </div>
        </>
           
    )
}

export default Invoice