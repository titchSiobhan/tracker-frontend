import Navbar from "./navbar";
import { useState, useContext, useEffect } from "react";
import CreateInvoicePage from "./createInvoice";
import { UserContext } from "./context/userContext";
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router";


function Invoice() {
const [createInvoiceToggle, setCreateInvoiceToggle] = useState(false);
const [invoices, setInvoices] = useState([]);
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
            <button onClick={createInvoice}>Create Invoice</button>
            {
                createInvoiceToggle && (
                    <div>
                       <CreateInvoicePage />
                    </div>
                )
            }
            {
                invoices.map((invoice: any) => (
                    <div key={invoice.id} onClick={() => getInvoice(invoice.id)}>
                        <p>{invoice.formattedDate.replace('/', '').replace('/', '')}</p>
                    </div>
                ))
            }
        </>
           
    )
}

export default Invoice