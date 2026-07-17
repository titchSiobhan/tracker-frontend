import Navbar from "../components/navbar";
import { useState, useContext, useEffect } from "react";
import CreateInvoicePage from "./createInvoice";
import { UserContext } from "../context/userContext";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router";
import "./invoice.css"


function Invoice() {
const [createInvoiceToggle, setCreateInvoiceToggle] = useState(false);
const [invoices, setInvoices] = useState<any[]>([]);
const { authFetch } = useContext(UserContext);
const navigate = useNavigate();


async function getInvoices() {
    const response = await authFetch(`${API_URL}invoice`);
    const data = await response.json();
    console.log(data);
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
console.log(invoices);
function createInvoice() {
    setCreateInvoiceToggle(prev => !prev);
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
            <div className="invoice-list">
            {
                invoices.map((invoice: any) => (
                    <div key={invoice.id} onClick={() => getInvoice(invoice.id)}>
                        <p className="invoice-date">{invoice.formattedDate.split('/').join('')}</p>
                    </div>
                ))
            }</div>
            </div>
        </>
           
    )
}

export default Invoice